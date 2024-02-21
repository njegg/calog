<script lang='ts'>
  import SessionCard from "./SessionCard.svelte";
  import NavigationBar from "~/lib/common/NavigationBar.svelte";
  import { SessionRepo } from "~/persistance/db";
  import { Session } from "~/persistance/model/session";
  import { selectedSession } from "../selectedSessionCardStore";
  import { DateHash } from "../util/date_hash";
  import { ThemeColors, themeStore } from "../common/theme";
  import AddSessionModal from "../search/AddSessionModal.svelte";
  import { SessionModalState } from "../search/sessionModalSelection";
  import { TextField } from "@nativescript/core";
  import { KeyboardType } from '~/../types/keyboardType';

  const dayInMS = 24 * 60 * 60 * 1000;

  enum State {
    NORMAL,
    DATE_PICKER,
    EDIT_MODAL,
  }

  $: state = State.NORMAL;

  $: input = '';
  $: reps = '';
  $: sets = '';
  $: textField = <any> new TextField(); // any because the lsp is ass
  $: editModalState = SessionModalState.SETS;
  let editingSession: Session | undefined;
  let keyboardType: KeyboardType = 'integer';

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let date = new Date();
  let dateHash = DateHash.fromDate(date);
  let todayHash = dateHash;
  let sessionCache: Map<number, Session[]> = createSessionCache();

  let sessions: Session[] = [];

  $: {
    dateHash = DateHash.fromDate(date);

    if (dateHash > todayHash) { // no time travel
      date = new Date();
    } else {
      // Unselect the one selected for deleting
      selectedSession.update(_ => undefined);

      updateSessionCache();
    }
  }

  function onTextChange(event: any) {
    input = event.value;

    if (editModalState == SessionModalState.SETS) {
      sets = input;
    } else if (editModalState == SessionModalState.REPS) {
      reps = input;
    }
  };

  function updateSessionCache() {
    let cached = sessionCache.get(dateHash);

    if (!cached) {
      cached = SessionRepo.allBy('dateHash', dateHash);
      sessionCache.set(dateHash, cached);
    }

    sessions = cached;
  }

  SessionRepo.onChangeListener(() => {
    sessionCache = createSessionCache();
    sessions = sessionCache.get(dateHash) || [];
  });

  function createSessionCache(): Map<number, Session[]> {
    let cache = new Map<number, Session[]>();

    let hash = DateHash.fromDate(date);
    let todayHash = DateHash.fromDate(new Date());

    cache.set(hash, SessionRepo.allBy('dateHash', hash));

    if (hash != todayHash) {
      cache.set(todayHash, SessionRepo.allBy('dateHash', todayHash));
    }

    return cache;
  }


  function setInput(to: string) {
      input = to;

      // fuck you
      setTimeout(() => {
        textField.nativeElement.focus()
        textField.nativeView.setSelection(to.length);
      }, 0);
  }

  function next() {
    switch (state) {
      case State.DATE_PICKER: {
        state = State.NORMAL;
        return;
      }

      case State.NORMAL: {
        date.setTime(date.getTime() + dayInMS);
        date = date;

        return;
      }

      case State.EDIT_MODAL: {
        if (editingSession == undefined) {
          throw new Error("illegale state");
        }

        switch (editModalState) {
          case SessionModalState.SETS: {
            editModalState = SessionModalState.REPS;

            keyboardType = 'integer';
            setInput(editingSession.reps.toString());

            break;
          }

          case SessionModalState.REPS: {
            editModalState = SessionModalState.SETS;
            state = State.NORMAL;

            if (editingSession && editingSession.id) {
              editingSession.reps = +reps;
              editingSession.sets = +sets;

              if (SessionRepo.update(editingSession.id, editingSession)) {
                sessions = SessionRepo.allByDate(date);
              } else {
                throw new Error("db failed to update session");
              }
            } else {
              throw new Error("invalid state");
            }

            break;
          }
        }
      }
    }
  }

  function prev() {
    switch (state) {
      case State.DATE_PICKER: {
        state = State.NORMAL;
        date = new Date();
        return;
      }

      case State.NORMAL: {
        let prevDay = date.getTime() - dayInMS;
        date.setTime(prevDay);
        date = date;

        return;
      }

      case State.EDIT_MODAL: {
        if (editingSession == undefined) {
          throw new Error("illegale state");
        }

        switch (editModalState) {
          case SessionModalState.SETS: {
            state = State.NORMAL;
            editingSession = undefined;
            break;
          }

          case SessionModalState.REPS: {
            editModalState = SessionModalState.SETS;

            keyboardType = 'integer';
            setInput(editingSession.sets.toString());

            break;
          }
        }
      }
    }
  }

  function datePickerTap() {
    switch (state) {
      case State.NORMAL: state = State.DATE_PICKER; return;
      case State.DATE_PICKER: state = State.NORMAL; return;
      case State.EDIT_MODAL: throw new Error("Date picker taped on illegal state EDIT_MODAL");
    }
  }

  function deleteSession(event: any) {
    let id: string = event.detail.id;

    sessions = sessions.filter(s => s.id != id);
    SessionRepo.del(id);
  }

  function showEditModal(e: any) {
    state = State.EDIT_MODAL;
    editingSession = <Session> e.detail.session;
    keyboardType = 'integer';

    setInput(editingSession.sets.toString());

    reps = editingSession.reps.toString();
    sets = editingSession.sets.toString();
  }

</script>


<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  {#if state == State.NORMAL || state == State.DATE_PICKER }
    <scrollView>
      <flexboxLayout
        flexDirection='column'
        justifyContent='flex-end'
      >
        <label height={200} />
        {#each sessions as item}
          <SessionCard
            on:update={showEditModal}
            session={item}
            on:delete={deleteSession}
          />
        {/each}
      </flexboxLayout>
    </scrollView>
  {:else if state == State.EDIT_MODAL && editingSession != undefined}
    <AddSessionModal
      bind:state={editModalState}
      reps={reps}
      sets={sets}
      exercise={editingSession.exercise}
    />
  {/if}

  {#if state == State.DATE_PICKER }
    <datePicker
      bind:date
      borderRadius={20}
      height={200}
      minHeight={200}
      backgroundColor={theme.baseLight}
      margin={8}
      color={theme.love}
    />
  {/if}

  <NavigationBar next={next} prev={prev}>
    {#if state == State.EDIT_MODAL }
      <textField
        bind:this={textField}
        bind:text={input}

        id="search-input"

        on:textChange={onTextChange}
        on:returnPress={next}

        color={theme.text}
        flexGrow={1}
        editable='true'
        returnKeyType='next'
        bind:keyboardType
        textAlignment='center'
        fontFamily='monospace'
        fontSize='20rem'
        borderWidth='0'
      />
    {:else}
      <label
        on:tap={datePickerTap}

        text={date.toLocaleDateString()}
        color={theme.muted}
        flexGrow={1}
        textAlignment='center'
      />
    {/if}
  </NavigationBar>

</flexboxLayout>


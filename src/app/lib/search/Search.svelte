<script lang='ts'>
  import { TextField } from '@nativescript/core';
  import { Exercise } from '~/persistance/model/exercise';
  import { KeyboardType } from '~/../types/keyboardType';
  import { fuzzyMatch } from './fuzzyMatch';
  import { Session } from '~/persistance/model/session';
  import AddSessionModal from './AddSessionModal.svelte';
  import ExerciseList from './ExerciseList.svelte';
  import NavigationBar from '../common/NavigationBar.svelte';
  import { ExerciseRepo, SessionRepo } from '~/persistance/db';
  import { SessionModalState } from './sessionModalSelection';
  import { ThemeColors, themeStore } from '../common/theme';
    import AddExerciseModal from './AddExerciseModal.svelte';
    import CircleButton from '../common/CircleButton.svelte';

  export let exercises: Exercise[];

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  enum State {
    Search,
    AddSessionModal,
    AddExerciseModal,
    EditExerciseModal,
  }

  $: state = State.Search;

  $: searchResults = exercises;
  $: searchString = '';
  $: input = '';
  $: addExerciseModalVisible = false;

  $: reps = '';
  $: sets = '';
  $: note = '';

  $: sessionModalState = SessionModalState.EXERCISE;
  $: textField = <any> new TextField(); // any because the lsp is ass

  let keyboardType: KeyboardType = 'url';
  let selectedExercise: Exercise;
  let addExerciseModal: AddExerciseModal;

  function updateSearchResults() {
      if (input == '') {
        searchResults = exercises;
      } else {
        searchResults = exercises.filter(e => fuzzyMatch(searchString, e.name))
      }
  }

  function onTextChange(event: any) {
    input = event.value;

    if (sessionModalState == SessionModalState.EXERCISE) {
      searchString = input;
      updateSearchResults();
    } else if (sessionModalState == SessionModalState.SETS) {
      sets = input;
    } else if (sessionModalState == SessionModalState.REPS) {
      reps = input;
    } else {
      note = input;
    }
  };

  function onTap(event: any) {
    selectedExercise = event.detail.exercise;
    nextSelection();
  }

  function returnPress() {
    if (addExerciseModalVisible) {
      addExerciseModal.next();
      return;
    }

    if (sessionModalState == SessionModalState.EXERCISE) {
      let exercisesFound = searchResults.length;
      if (!exercisesFound) return;

      selectedExercise =  searchResults[exercisesFound - 1];
    }

    nextSelection();
  }

  function nextSelection() {
    if (addExerciseModalVisible) {
      addExerciseModal.next();
      return;
    }

    switch (sessionModalState) {
      case SessionModalState.EXERCISE: {
        sessionModalState = SessionModalState.SETS;

        keyboardType = 'integer';
        input = '';

        break;
      }

      case SessionModalState.SETS: {
        sessionModalState = SessionModalState.REPS
        keyboardType = 'integer';

        setInput(reps);

        break;
      }

      case SessionModalState.REPS: {
        sessionModalState = SessionModalState.NOTE;
        keyboardType = 'url';

        setInput(note);

        break;
      }

      case SessionModalState.NOTE: {
        sessionModalState = SessionModalState.EXERCISE;
        keyboardType = 'url';

        if (selectedExercise) {
          let session: Session = Session.of(
            new Date(),
            selectedExercise,
            +reps,
            +sets,
            note
          );

          if (!SessionRepo.add(session)) {
              console.error('db broke')
          }

        } else {
          throw 'how does throw work?' // TODO
        }

        reps = '';
        sets = '';
        note = '';

        setInput('');

        break;
      }
    }
  }

  function previousSelection() {
    if (addExerciseModalVisible) {
      addExerciseModal.prev();
      return;
    }

    switch (sessionModalState) {
      case SessionModalState.EXERCISE: {
        input = '';
        searchString = '';

        setInput(searchString);

        break;
      }

      case SessionModalState.SETS: {
        sessionModalState = SessionModalState.EXERCISE;

        setInput(searchString);

        reps = '';
        sets = '';
        keyboardType = 'url';

        break;
      }

      case SessionModalState.REPS: {
        sessionModalState = SessionModalState.SETS;

        setInput(sets);
        keyboardType = 'integer';

        break;
      }

      case SessionModalState.NOTE: {
        sessionModalState = SessionModalState.REPS;

        setInput(reps);
        keyboardType = 'integer';

        break;
      }
    }
  }

  function setInput(to: string) {
      input = to;
      searchString = to;

      textField.nativeView.text = to;
      textField.nativeView.setSelection(to.length);
      setTimeout(() => textField.nativeElement.focus(), 0);

      updateSearchResults();
  }

  function showAddExerciseModal() {
    addExerciseModalVisible = true;
  }

  function onAddExerciseModalClose(didAddExercise: boolean): void {
    if (didAddExercise) {
      exercises = ExerciseRepo.all();
    }

    addExerciseModalVisible = false;
    setInput("");
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>

    {#if sessionModalState != SessionModalState.EXERCISE }
      <AddSessionModal
        bind:reps
        bind:sets
        bind:note
        bind:state={sessionModalState}
        exercise={selectedExercise}
        on:returnPress={returnPress}
      />
    {:else}

  {#if !addExerciseModalVisible}
      <ExerciseList exercises={searchResults} on:tap={onTap}/>
  {/if}
    {/if}

  {#if addExerciseModalVisible}
    <AddExerciseModal
      bind:this={addExerciseModal}
      bind:name={input}
      on:wantsToClose={onAddExerciseModalClose}
      />
  {/if}

    <NavigationBar
      prev={previousSelection}
      next={returnPress}
    >
      <textField
        bind:this={textField}
        bind:text={input}

        id="search-input"

        on:textChange={onTextChange}
        on:returnPress={returnPress}

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

      {#if !addExerciseModalVisible }
        <CircleButton  text="+" backgroundColor={theme.love} color={theme.text} width={40} on:tap={showAddExerciseModal} />
      {/if}

    </NavigationBar>

</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

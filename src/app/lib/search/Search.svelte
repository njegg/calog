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
  import { HapticImpactType, Haptics } from '@nativescript/haptics';

  export let exercises: Exercise[];

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let haptic = Haptics.isSupported();

  enum State {
    SEARCH,
    ADD_SESSION_MODAL,
    ADD_EXERCISE_MODAL,
    EDIT_EXERCISE_MODAL,
  }

  $: state = State.SEARCH;
  $: sessionModalState = SessionModalState.SETS;

  $: searchResults = exercises;
  $: searchString = '';
  $: input = '';

  $: reps = '';
  $: sets = '';

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

    switch (state) {

      case State.SEARCH:
        searchString = input;
        updateSearchResults();
        break;

      case State.ADD_SESSION_MODAL:
        switch (sessionModalState) {
          case SessionModalState.SETS: sets = input; break;
          case SessionModalState.REPS: reps = input; break;
        }

        return;

      case State.ADD_EXERCISE_MODAL:
      case State.EDIT_EXERCISE_MODAL:

    }
  }

  function onTap(event: any) {
    if (haptic) Haptics.impact(HapticImpactType.LIGHT);

    selectedExercise = event.detail.exercise;
    nextSelection();
  }

  function returnPress() {
    let exercisesFound = searchResults.length;
    if (state == State.SEARCH && !exercisesFound) {
      showAddExerciseModal()
      return;
    }

    selectedExercise =  searchResults[exercisesFound - 1];

    nextSelection();
  }

  function nextSelection() {
    switch (state) {

      case State.SEARCH:
          sessionModalState = SessionModalState.SETS;
          state = State.ADD_SESSION_MODAL;

          keyboardType = 'integer';
          input = '';

          break;

      case State.ADD_SESSION_MODAL:
        switch (sessionModalState) {
          case SessionModalState.SETS:
            sessionModalState = SessionModalState.REPS
            keyboardType = 'integer';

            setInput(reps);

            break;

          case SessionModalState.REPS:
            sessionModalState = SessionModalState.SETS;
            state = State.SEARCH;

            keyboardType = 'url';

            if (selectedExercise) {
              let session: Session = Session.of(
                new Date(),
                selectedExercise,
                +reps,
                +sets,
              );

              if (!SessionRepo.add(session)) console.error('db broke')
            }

            reps = '';
            sets = '';

            setInput('');

            break;
        }
        break;

      case State.ADD_EXERCISE_MODAL:
        addExerciseModal.next();
        break;

      case State.EDIT_EXERCISE_MODAL:
        break;
    }
  }

  function previousSelection() {
    switch (state) {

      case State.SEARCH:
        input = '';
        searchString = '';

        setInput(searchString);
        break;


      case State.ADD_SESSION_MODAL:
        switch (sessionModalState) {

          case SessionModalState.SETS:
            state = State.SEARCH;

            setInput(searchString);

            reps = '';
            sets = '';
            keyboardType = 'url';

            break;

          case SessionModalState.REPS:
            sessionModalState = SessionModalState.SETS;

            setInput(sets);
            keyboardType = 'integer';

            break;
        }
        break;

      case State.ADD_EXERCISE_MODAL:
        if (input == "") {
          addExerciseModal.prev();
        } else {
          setInput("");
        }
        return;

      case State.EDIT_EXERCISE_MODAL:
        break;
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
    if (haptic) Haptics.impact(HapticImpactType.LIGHT);

    state = State.ADD_EXERCISE_MODAL;
  }

  function onAddExerciseModalClose(event: CustomEvent<boolean>): void {
    if (event.detail) {
      exercises = ExerciseRepo.all();
    }

    state = State.SEARCH;
    setInput("");
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>

  {#if state == State.ADD_SESSION_MODAL }
    <AddSessionModal
      bind:reps
      bind:sets
      bind:state={sessionModalState}
      exercise={selectedExercise}
      on:returnPress={returnPress}
    />
  {:else if state == State.SEARCH}
    <ExerciseList exercises={searchResults} on:tap={onTap}/>

    <stackLayout>
      <CircleButton
        text="+"
        backgroundColor={theme.baseLight}
        color={theme.pine}
        width={40}
        height={40}
        on:tap={showAddExerciseModal}
        fontSize={30}
      />
    </stackLayout>
  {:else if state == State.ADD_EXERCISE_MODAL}
    <AddExerciseModal
      bind:this={addExerciseModal}
      bind:name={input}
      on:wantsToClose={(e) => onAddExerciseModalClose(e)}
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
  </NavigationBar>
</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

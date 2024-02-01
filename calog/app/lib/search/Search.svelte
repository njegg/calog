<script lang='ts'>
  import { TextField } from '@nativescript/core';
  import { PropertyChangeData } from 'tns-core-modules';
  import { Exercise } from '~/persistance/model/exercise';
  import { KeyboardType } from '~/../types/keyboardType';
  import { fuzzyMatch } from './fuzzyMatch';
  import { Session } from '~/persistance/model/session';
  import AddSessionModal from './AddSessionModal.svelte';
  import ExerciseList from './ExerciseList.svelte';
  import NavigationBar from '../common/NavigationBar.svelte';
  import { SessionRepo } from '~/persistance/db';
  import { SessionModalState } from './sessionModalSelection';

  export let exercises: Exercise[];

  $: searchResults = exercises;
  $: searchString = '';
  $: input = '';

  $: reps = '';
  $: sets = '';
  $: note = '';

  $: selection = SessionModalState.EXERCISE;
  $: textField = new TextField();

  let keyboardType: KeyboardType = 'url';
  let selectedExercise: Exercise;

  function updateSearchResults() {
      if (input == '') {
        searchResults = exercises;
      } else {
        searchResults = exercises.filter(e => fuzzyMatch(searchString, e.name))
      }
  }

  function onTextChange(event: PropertyChangeData) {
    input = event.value;

    if (selection == SessionModalState.EXERCISE) {
      searchString = input;
      updateSearchResults();
    } else if (selection == SessionModalState.SETS) {
      sets = input;
    } else if (selection == SessionModalState.REPS) {
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
    if (selection == SessionModalState.EXERCISE) {
      let exercisesFound = searchResults.length;
      if (!exercisesFound) return;

      selectedExercise =  searchResults[exercisesFound - 1];
    }

    nextSelection();
  }

  function nextSelection() {
    switch (selection) {
      case SessionModalState.EXERCISE: {
        selection = SessionModalState.SETS;

        keyboardType = 'integer';
        input = '';

        break;
      }

      case SessionModalState.SETS: {
        selection = SessionModalState.REPS
        keyboardType = 'integer';

        setInput(reps);

        break;
      }

      case SessionModalState.REPS: {
        selection = SessionModalState.NOTE;
        keyboardType = 'url';

        setInput(note);

        break;
      }

      case SessionModalState.NOTE: {
        selection = SessionModalState.EXERCISE;
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
    switch (selection) {
      case SessionModalState.EXERCISE: {
        input = '';
        searchString = '';

        setInput(searchString);

        break;
      }

      case SessionModalState.SETS: {
        selection = SessionModalState.EXERCISE;

        setInput(searchString);

        reps = '';
        sets = '';
        keyboardType = 'url';

        break;
      }

      case SessionModalState.REPS: {
        selection = SessionModalState.SETS;

        setInput(sets);
        keyboardType = 'integer';

        break;
      }

      case SessionModalState.NOTE: {
        selection = SessionModalState.REPS;

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
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  {#if selection != SessionModalState.EXERCISE }
    <AddSessionModal
      bind:reps
      bind:sets
      bind:note
      bind:state={selection}
      repsSelected={selection == SessionModalState.REPS}
      exercise={selectedExercise}
      on:returnPress={returnPress}
    />
  {:else}
    <ExerciseList exercises={searchResults} on:tap={onTap}/>
  {/if}

  <NavigationBar
    prev={previousSelection}
    next={returnPress}
  >
    <textField
      bind:this={textField}
      bind:text={input}

      id="search-input"
      flexGrow={1}

      on:textChange={onTextChange}
      on:returnPress={returnPress}

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

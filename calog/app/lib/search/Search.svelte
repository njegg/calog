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

  enum Selection {
    EXERCISE, SETS, REPS
  };

  export let exercises: Exercise[];

  $: searchResults = exercises;
  $: searchString = '';
  $: input = '';

  $: reps = '';
  $: sets = '';

  $: selection = Selection.EXERCISE;
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

    if (selection == Selection.EXERCISE) {
      searchString = input;
      updateSearchResults();
    } else if (selection == Selection.SETS) {
      sets = input;
    } else {
      reps = input;
    }
  };

  function onTap(event: any) {
    selectedExercise = event.detail.exercise;
    nextSelection();
  }

  function returnPress() {
    if (selection == Selection.EXERCISE) {
      let exercisesFound = searchResults.length;
      if (!exercisesFound) return;

      selectedExercise =  searchResults[exercisesFound - 1];
    }

    nextSelection();
  }

  function nextSelection() {
    switch (selection) {
      case Selection.EXERCISE: {
        selection = Selection.SETS;

        keyboardType = 'integer';
        input = '';

        break;
      }
      case Selection.SETS: {
        selection = Selection.REPS
        keyboardType = 'integer';

        setInput(reps);

        break;
      }
      case Selection.REPS: {
        selection = Selection.EXERCISE;
        keyboardType = 'url';

        if (selectedExercise) {
          let session: Session = Session.of(new Date(), selectedExercise, +reps, +sets);

          if (!SessionRepo.add(session)) {
              console.error('db broke')
          }

        } else {
          throw 'how does throw work?' // TODO
        }

        reps = '';
        sets = '';

        setInput('');

        break;
      }
    }
  }

  function previousSelection() {
    switch (selection) {
      case Selection.EXERCISE: {
        input = '';
        searchString = '';

        setInput(searchString);

        break;
      }
      case Selection.SETS: {
        selection = Selection.EXERCISE;

        setInput(searchString);

        reps = '';
        sets = '';
        keyboardType = 'url';

        break;
      }
      case Selection.REPS: {
        selection = Selection.SETS;

        setInput(sets);
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
  {#if selection != Selection.EXERCISE }
    <AddSessionModal
      bind:reps
      bind:sets
      repsSelected={selection == Selection.REPS}
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

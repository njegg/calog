<script lang='ts'>
  import { PropertyChangeData, TextField } from '@nativescript/core';
  import { Exercise } from '~/exercise';
  import AddSessionModal from './AddSessionModal.svelte';
  import ExerciseList from './ExerciseList.svelte';

  export let exercises: Exercise[];
  export let isInView: boolean = true;

  $: searchResults = exercises;
  $: input = '';

  $: reps = '';
  $: sets = '';
  $: searchString = '';

  let keyboardType: "number" | "integer" | "datetime" | "phone" | "url" | "email" | undefined = 'url';
  let selectedExercise: Exercise | undefined;
  let textField: TextField;

  enum Selection {
    EXERCISE, SETS, REPS
  };

  let selection: Selection = Selection.EXERCISE;
  /* selectedExercise = exercises[0]; */

  $: {
    if (isInView) {
      /* setTimeout(() => textField.nativeElement.focus(), 0); */
    }
  }

  function searchMatch(term: string, str: string) {
    let termLen = term.length;
    if (termLen == 0) return true;

    let termIndex = 0;
    let strIndex = 0;

    while (termIndex < termLen && strIndex < str.length) {
      let tchar: number = term.charCodeAt(termIndex);
      let schar: number = str.charCodeAt(strIndex);

      if (tchar == schar || tchar - schar == 32 || schar - tchar == 32) {
        termIndex++;
      }

      strIndex++;
    }

    return termIndex == termLen;
  }

  function onTextChange(change: PropertyChangeData) {
    input = change.value;

    if (selection == Selection.EXERCISE) {
      searchString = input;

      if (input == '') {
        searchResults = exercises;
      } else {
        searchResults = exercises.filter(e => searchMatch(searchString, e.name))
      }
    } else if (selection == Selection.SETS) {
      sets = change.value;
    } else {
      reps = change.value;
    }
  };
  
  function onTap(event: Event) {
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

        input = '';

        break;
      }
      case Selection.REPS: {
        selection = Selection.EXERCISE;
        keyboardType = 'url';

        saveSession();
        
        reps = '';
        sets = '';

        input = searchString;

        break;
      }
    }
  }

  function previousSelection() {
    switch (selection) {
      case Selection.EXERCISE: {
        input = '';
        searchString = '';

        break;
      }
      case Selection.SETS: {
        selection = Selection.EXERCISE;

        restoreSearch();

        reps = '';
        sets = '';
        keyboardType = 'url';

        break;
      }
      case Selection.REPS: {
        selection = Selection.SETS;

        input = sets;
        keyboardType = 'integer';
        
        break;
      }
    }
  }

  function restoreSearch() {
      input = searchString;
      textField.nativeView.text = searchString;
      textField.nativeView.setSelection(searchString.length);
      setTimeout(() => textField.nativeElement.focus(), 0);
  }

  function saveSession() {
    console.log(`${selectedExercise?.name.toUpperCase()}\nsets: ${+sets}\nreps: ${+reps}\n`);

    selectedExercise = undefined;

    restoreSearch();
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
      exercise={selectedExercise}
      on:returnPress={returnPress}/>
  {:else}
    <ExerciseList cards={searchResults} on:tap={onTap}/>
  {/if}

  <flexboxLayout
      backgroundColor='#21202e'

      minHeight={60}
      height={60}
      
      borderRadius={100}
      margin={10}
      padding={10}
  >
    <!-- TODO: use SearchField ? -->

    <label
      on:tap={previousSelection}

      width={40}
      height={40}
      text='❮'
      textAlignment='center'
      color='#6e6a86'
      borderRadius={100}
      backgroundColor='#403d52'
    />

    <textField
      bind:this={textField}
      id="search-input"
      flexGrow={1}

      bind:text={input}

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

    <label
      on:tap={returnPress}

      width={40}
      height={40}
      text='❯'
      textAlignment='center'
      borderRadius={100}
      backgroundColor='#403d52'
      color='#6e6a86'
    />
  </flexboxLayout>
</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

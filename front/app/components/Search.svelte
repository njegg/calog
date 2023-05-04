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

  let keyboardType: "number" | "integer" | "datetime" | "phone" | "url" | "email" | undefined = 'url';
  let selectedExercise: Exercise;

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
      if (input == '') {
        searchResults = exercises;
      } else {
        searchResults = exercises.filter(e => searchMatch(input, e.name))
      }
    } else if (selection == Selection.SETS) {
      sets = change.value;
    } else {
      reps = change.value;
    }
  };
  
  function clearInput() {
    input = '';
  }

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

    input = '';
  }

  function nextSelection() {
    switch (selection) {
      case Selection.EXERCISE: {
        selection = Selection.SETS;
        keyboardType = 'integer';
        break;
      }
      case Selection.SETS: {
        selection = Selection.REPS
        keyboardType = 'integer';
        break;
      }
      case Selection.REPS: {
        selection = Selection.EXERCISE;
        keyboardType = 'url';
        
        reps = '';
        sets = '';

        break;
      }
    }

    clearInput();
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
    <textField
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
      on:tap={clearInput}

      width={40}
      height={40}
      text='✕'
      textAlignment='center'
      borderRadius={100}
      backgroundColor='#eb6f92'
    />
  </flexboxLayout>
</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

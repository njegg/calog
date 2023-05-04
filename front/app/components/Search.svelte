<script lang='ts'>
  import { ObservableArray, PropertyChangeData, TextField } from '@nativescript/core';
    import { onMount } from 'svelte';
    import { showModal } from 'svelte-native';
  import { Card, Exercise } from '~/exercise';
    import AddSessionModal from './AddSessionModal.svelte';
  import ExerciseList from './ExerciseList.svelte';

  export let exercises: Exercise[];
  export let isInView: boolean = true;

  $: searchResults = exercises;
  $: searchString = '';

  let selectedExercise: Exercise | undefined = undefined;

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
    searchString = change.value;

    if (searchString == '') {
      searchResults = exercises;
    } else {
      searchResults = exercises.filter(e => searchMatch(searchString, e.name))
    }
  };
  
  function clearSearch() {
    searchString = '';
  }

  function selectExercise() {
    selectedExercise =  searchResults[searchResults.length - 1];
  }

  let textField: TextField;

  async function onTap(event: Event) {
    let exercise = event.detail.exercise;
    selectedExercise = exercise;
  }

  function returnPress(e: Event) {
    let sessionData = e.detail;

    console.log(sessionData);

    selectedExercise = undefined;
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  {#if selectedExercise != undefined }
    <AddSessionModal bind:input={searchString} exercise={selectedExercise} on:returnPress={returnPress}/>
  {:else}
    <ExerciseList cards={searchResults} on:tap={onTap}/>
  {/if}

  <flexboxLayout
      minHeight='200px'
      backgroundColor='#1f1d2e'
      borderRadius='100'
      margin='10'
  >
    <label text=' s ' />

    <!-- TODO: use SearchField lmao -->
    <textField
      id="search-input"

      bind:text={searchString}
      bind:this={textField}

      on:textChange={onTextChange}
      on:returnPress={selectExercise}

      editable='true'
      returnKeyType='go'

      textAlignment='center'
      fontFamily='monospace'
      fontSize='20rem'
      borderWidth='0'
    />

    <label text=' x ' on:tap='{clearSearch}' />
  </flexboxLayout>
</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

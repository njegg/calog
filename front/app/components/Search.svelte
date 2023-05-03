<script lang='ts'>
  import { ObservableArray, PropertyChangeData } from '@nativescript/core';
    import { onMount } from 'svelte';
    import { showModal } from 'svelte-native';
  import { Card, Exercise } from '~/exercise';
  import AddSession from './AddSession.svelte';
  import ExerciseCard from './ExerciseCard.svelte';
  import ExerciseList from './ExerciseList.svelte';

  export let exercises: Exercise[];

  let cards: ObservableArray<Card> = new ObservableArray();
  exercises.forEach((e, i) => cards.push(new Card(e, i)));

  $: searchResults = cards;
 
  let searchString: string = '';

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
      searchResults = cards;
    } else {
      searchResults = cards.filter(c => searchMatch(searchString, c.exercise.name))
    }
  };
  
  function clearSearch() {
    searchString = '';
  }

  async function selectExercise() {
    let len = searchResults.length;
    if (len == 0) return;

    console.log(searchResults[len - 1].exercise.name);
  }

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <ExerciseList bind:cards={searchResults} />

  <flexboxLayout
      minHeight='200px'
  >
    <label text=' s ' />

    <!-- TODO: use SearchField lmao -->
    <textField
      id="search-input"

      bind:text={searchString}
      on:textChange={onTextChange}
      editable='true'

      returnKeyType='go'
      on:returnPress={selectExercise}

      textAlignment='center'
      fontFamily='monospace'
      fontSize='20rem'
      borderWidth='0'
      paddingBottom='10em'

      margin='0'
    />

    <label text=' x ' on:tap='{clearSearch}' />
  </flexboxLayout>
</flexboxLayout>

<style>
  #search-input {
    flex: 1;
  }
</style>

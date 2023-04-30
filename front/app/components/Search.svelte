<script lang='ts'>
  import { ListView, ObservableArray, PropertyChangeData } from '@nativescript/core';
  import { onMount } from 'svelte';
  import { Template } from 'svelte-native/components';
  import { Exercise } from '~/exercise';

  export let exercises: ObservableArray<Exercise>;
  $: searchResults = exercises;

  let searchString = '';

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
      searchResults = exercises.filter(x => searchMatch(searchString, x.name))
    }
  };
  
  function clearSearch() {
    searchString = '';
  }

  function selectItem() {

  }

  let listView: ListView;

  onMount(async () => {
    listView.scrollToIndex(exercises.length - 1);
	});

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>

  <listView
    row='1'
    bind:this='{listView}'
    items='{searchResults}'
    on:itemTap='{selectItem}'
  >
    <Template let:item>
      <label
        text='{item.name}'
        textWrap='true'
      />
    </Template>
  </listView>

  <flexboxLayout
      minHeight='200px'
  >
    <label text=' s ' />

    <textField
      id="search-input"
      bind:text='{searchString}'
      on:textChange='{onTextChange}'
      hint=''
      editable='true'

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

  #clear-button {
    background: transparent;
  }
</style>

<script lang='ts'>
    import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/exercise";

  export let exercise: Exercise;
  export let input: string;


  /* onMount(() => { */
  /*   utils.dismissSoftInput(); */
  /*   setTimeout(() => {}, 10); */

  /*   setTimeout(() => { */
  /*       firstTextField.nativeElement.focus(); */
  /*       /1* utils.ad.showSoftInput(0); *1/ */
  /*       utils.ad.getInputMethodManager().toggleSoftInput(android.view.inputmethod.InputMethodManager.SHOW_FORCED, 0) */
  /*   }, 100); */
	/* }); */

  const dispatch = createEventDispatcher();

  $: sets = input;
  $: reps = '';

  function nextField() {
    input = '';
    console.log('nextField')
  }

  function returnPress() {
    dispatch('returnPress', { reps: +reps, sets: +sets});
  }
</script>


<stackLayout>
  <label
    text={exercise.name}
  />

  <flexboxLayout>
    <textfield
      bind:text={sets}

      keyboardType='integer'
      editable='true'
      returnKeyType='next'
      on:returnPress={nextField}
      
      flexGrow={1}
    />
    <label
      text='x'
      textAlignment='center'
      flexGrow={1}
    />

    <textField 
      bind:text={reps}
      keyboardType='integer'
      on:returnPress={returnPress}

      editable='true'

      flexGrow={1}
    />
  </flexboxLayout>

  <flexboxLayout>
  <label
      text='rows'
      flexGrow={1}
    />
    <label
      text=''
      flexGrow={1}
    />
    <label
      text='sets'
      flexGrow={1}
    />
  </flexboxLayout>
</stackLayout>

<style>
  textField {
    font-size: 20px;
    font-family: monospace;
  }
</style>

<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/exercise";

  export let exercise: Exercise;
  export let sets: string;
  export let reps: string;
  export let repsSelected: bool;

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

  function nextField() {
    console.log('nextField')
  }

  function returnPress() {
    dispatch('returnPress', { reps: +reps, sets: +sets});
  }
</script>


<stackLayout
  backgroundColor='#26233a'
  borderRadius={20}
  margin={10}
  padding={20}
>
  <label
    color='#ebbcba'
    textAlignment='center'
    fontSize={20}
    text={exercise.name}
    marginBottom={20}
  />

  <!--
  <flexboxLayout>
    <label text='sets' class='bottom-text'/>
    <label text='' class='bottom-text' />
    <label text='reps' class='bottom-text'/>
  </flexboxLayout> -->

  <flexboxLayout>
    <label
      class='repset-input'
      text={sets == '' ? 'sets' : sets}
      borderColor={repsSelected ? '#6e6a86' : '#ebbcba' }
    />

    <label
      text='✕'
      fontSize={30}
      textAlignment='center'
      flexGrow={1}
    />

    <label
      class='repset-input'
      text={reps == '' ? 'reps' : reps}
      borderColor={repsSelected ? '#ebbcba' : '#6e6a86' }
    />
  </flexboxLayout>

</stackLayout>

<style>
  textField {
    font-size: 20;
    font-family: monospace;
  }

  .bottom-text {
    flex: 1;
    text-align: center;
  }

  .repset-input {
    border-width: 1;
    width: 100;
    text-align: center;
    border-width: 2;
    border-radius: 20;
    padding: 10, 20;
    font-size: 25;
  }
</style>


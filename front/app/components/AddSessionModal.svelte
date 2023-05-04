<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/exercise";

  export let exercise: Exercise;
  export let sets: string;
  export let reps: string;

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


<stackLayout>
  <label
    text={exercise.name}
  />

  <flexboxLayout>
    <label text={sets}/>
    <label
      text='x'
      textAlignment='center'
      flexGrow={1}
    />
    <label text={reps}/>
  </flexboxLayout>

  <flexboxLayout>
    <label
      text='rows'
    />
    <label
      text=''
    />
    <label
      text='sets'
    />
  </flexboxLayout>
</stackLayout>

<style>
  textField {
    font-size: 20px;
    font-family: monospace;
  }
</style>

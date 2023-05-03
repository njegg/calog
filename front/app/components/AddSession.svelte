<script lang='ts'>
  import { closeModal } from "svelte-native";
  import { Exercise } from "~/exercise";

  export let exercise: Exercise;

  $: reps = '';
  $: sets = '';
</script>

<frame>
  <page>
    <flexboxLayout
      justifyContent='flex-end'
      flexDirection='column'
    >
      <label text={exercise.name} />

      <button on:tap={() => closeModal('cool session bro')}>Close</button>

      <flexboxLayout
          minHeight='200px'
      >
        <label text=' s ' />

        <label text='sets'></label>
        <textField
          id='reps-input'
          bind:text={reps}
          editable='true'
          returnKeyType='go'
          fontSize='20rem'
        />

        <label text=' x'></label>

        <label text='reps'></label>
        <textField
          id='sets-input'
          bind:text={sets}
          editable='true'
          returnKeyType='go'
          fontSize='20rem'
        />
      </flexboxLayout>
    </flexboxLayout>
  </page>
</frame>

<style>
</style>

<script lang='ts'>
  import { Exercise } from "~/exercise";
  import SelectableLabel from "./SelectableLabel.svelte";

  export let exercise: Exercise;
  export let sets: string;
  export let reps: string;
  export let repsSelected: boolean;
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

  <flexboxLayout>
    <SelectableLabel
      selected={repsSelected}
      bind:text={sets}
      alt='set'
    />

    <label
      text='✕'
      fontSize={30}
      textAlignment='center'
      flexGrow={1}
    />

    <SelectableLabel
      selected={!repsSelected}
      bind:text={reps}
      alt='rep'
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


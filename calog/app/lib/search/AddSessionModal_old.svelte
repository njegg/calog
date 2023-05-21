<script lang='ts'>
  import { Exercise } from '~/persistance/model/exercise'
  import SelectableLabel from "../common/SelectableLabel.svelte";

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


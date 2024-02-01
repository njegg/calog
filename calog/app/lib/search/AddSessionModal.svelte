<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise'
import SelectableLabel from "../common/SelectableLabel.svelte";
import { SessionModalState } from './sessionModalSelection';

export let exercise: Exercise;
export let sets: string;
export let reps: string;
export let note: string;
export let state: SessionModalState;

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

  <flexboxLayout
    justifyContent='space-between'
  >
    <SelectableLabel
      selected={state == SessionModalState.SETS}
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
      selected={state == SessionModalState.REPS}
      bind:text={reps}
      alt='rep'
    />
  </flexboxLayout>

  <SelectableLabel
    margin='20 0 0 0'
    selected={state == SessionModalState.NOTE}
    bind:text={note}
    alt='note'
    width='100%'
  />
</stackLayout>


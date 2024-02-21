<script lang='ts'>
  import { Exercise } from '~/persistance/model/exercise'
  import SelectableLabel from "../common/SelectableLabel.svelte";
  import { SessionModalState } from './sessionModalSelection';
  import { ThemeColors, themeStore } from '../common/theme';

  export let exercise: Exercise;
  export let sets: string;
  export let reps: string;
  export let state: SessionModalState;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);
</script>

<stackLayout
  backgroundColor={theme.baseLight}
  borderRadius={20}
  margin={10}
  padding={20}
>
  <label
    color={theme.rose}
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
      color={theme.text}
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
</stackLayout>


<script lang='ts'>
  import { ThemeColors, themeStore } from '../common/theme';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Exercise } from '~/persistance/model/exercise';
  import { ExerciseRepo } from '~/persistance/db';

  export let name: string ="";

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  $: tags = <string[]>[];

  const dispatch = createEventDispatcher();

  function iWantToClose(hasAddedExercise: boolean) {
    dispatch('wantsToClose', {hasAddedExercise});
  }

  export function next() {
    save();
  }

  export function prev() {
    iWantToClose(false);
  }

  function save(): void {
    ExerciseRepo.add(<Exercise>{name, tags});
    iWantToClose(true);
  }
</script>

<label
  fontSize={20}
  color={theme.highlightLight}
  text="new exercise"
  textAlignment='center'
/>

<flexboxLayout
  backgroundColor={theme.baseMid}
  borderRadius={20}
  margin={10}
  padding={20}
  flexDirection='column'
  minHeight={50}
>
  <label
    text={name == "" ? "name..." : name}
    color={name == "" ? theme.highlightLight : theme.text}
    fontSize={20}
    textAlignment='center'
    flexGrow={1}
  />
</flexboxLayout>


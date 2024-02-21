<script lang='ts'>
  import { ThemeColors, themeStore } from '../common/theme';
  import { createEventDispatcher, onMount } from 'svelte';
  import { Exercise } from '~/persistance/model/exercise';
  import { ExerciseRepo } from '~/persistance/db';

  export let name: string ="";

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  $: tags = <string[]>[];
  let textField: any;

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

  onMount(() => {setTimeout(() => textField.nativeElement.focus(), 0);})

  function save(): void {
    let sucksass = ExerciseRepo.add(<Exercise>{name, tags});
    iWantToClose(sucksass);
  }
</script>


<flexboxLayout
  backgroundColor={theme.baseLight}
  borderRadius={20}
  margin={10}
  padding={20}
  flexDirection='column'
  minHeight={100}
>
  <label
    text={name == "" ? "name..." : name}
    color={name == "" ? theme.highlightLight : theme.text}
    fontSize={20}
    textAlignment='center'
    flexGrow={1}
  />
</flexboxLayout>


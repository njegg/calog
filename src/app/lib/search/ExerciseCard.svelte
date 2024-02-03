<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/persistance/model/exercise";
  import Card from "../common/Card.svelte";
  import { ThemeColors, themeStore } from "../common/theme";

  export let exercise: Exercise;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let dispach = createEventDispatcher();

  function select() {
    dispach('tap', {exercise});
  }

  function showStats() {
    console.log(`${exercise.name} stats`)
  }
</script>

<Card>
  <label
    on:tap={select}
    text={exercise.name}

    textWrap='true'
    flexGrow={1}
    textAlignment='center'
  >
  </label>

  <label
    on:tap={showStats}

    width={30}
    height={30}
    margin={5}
    textAlignment='center'
    borderRadius='100'
    backgroundColor={theme.rose}
  />
</Card>


<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/persistance/model/exercise";
  import { printFile } from "~/lib/sessionStore";
  import Card from "../common/Card.svelte";

  export let exercise: Exercise;

  let dispach = createEventDispatcher();

  function select() {
    dispach('tap', {exercise});
  }

  function showStats() {
    console.log(`${exercise.name} stats`)

    printFile();
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

    width={40}
    height={40}
    text='…'
    textAlignment='center'
    borderRadius='100'
    backgroundColor='#eb6f92'
  />
</Card>


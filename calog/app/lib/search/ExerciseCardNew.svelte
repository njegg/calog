<script lang='ts'>

import { createEventDispatcher, onMount } from "svelte";
import { Exercise } from "~/persistance/model/exercise";
import Card from "../common/Card.svelte";
import { Command } from "../command/command";

export let command: Command;
export let exercise: Exercise;

command.exec = select;

let dispach = createEventDispatcher();

function select() {
  dispach('message', {exercise});
  /* console.log(`command "${exercise.name}" executed`) */
}

</script>

<Card margin='8 0'>
  <label
    on:tap={command.exec}
    text={command.name}

    textWrap='true'
    flexGrow={1}
    textAlignment='center'
  >
  </label>
</Card>


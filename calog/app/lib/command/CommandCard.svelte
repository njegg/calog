<script lang='ts'>
import Card from "../common/Card.svelte";
import { Command } from "./command";
export let command: Command;
</script>

<Card margin={0}>
  <label
    on:tap={command.exec}
    text={command.name}

    textWrap='true'
    flexGrow={1}
    textAlignment='center'
  >
  </label>
</Card>


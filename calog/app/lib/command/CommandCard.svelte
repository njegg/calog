<script lang='ts'>

import { Command } from "./command";

export let command: Command;

</script>

<button
  on:tap={() => command.exec()}
  text={command.name}

  fontSize={20}
  borderRadius={20}
  padding={10}
  textAlignment='center'
  minWidth={0}
/>


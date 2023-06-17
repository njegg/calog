<script lang='ts'>

import { CommandComponentProps } from "~/../types/commandListItemType";
import CommandCard from "../command/CommandCard.svelte";
import FuzzyCommandList from "../command/FuzzyCommandList.svelte";
import { settingsCommands } from "./settings";

export let inFocus: boolean = false;
let searchList: any;

$: {
  if (inFocus) {
    searchList.focus();
  }
}

let componentProps = settingsCommands.map(
  command => <CommandComponentProps>{command, rest:{}}
);

</script>

<FuzzyCommandList
  bind:this={searchList}
  componentType={CommandCard}
  commandComponentProps={componentProps}
/>


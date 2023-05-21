<script lang='ts'>

import { CommandComponentProps } from "~/../types/commandListItemType";
import { fuzzyMatch } from "../search/fuzzyMatch";
import { Template } from 'svelte-native/components'

type CommandComponent = $$Generic<typeof SvelteComponentTyped<any, any, any>>;

/* HACK:
 * Command component has a command as its first prop
 * Rest of props is on me, don't know how to type it
 */
export let componentType: CommandComponent;
export let commandComponentProps: CommandComponentProps[];

$: visibleCommands = commandComponentProps;

export function update(text: string) {
  visibleCommands = text == '' ?
    commandComponentProps :
    commandComponentProps.filter(c => fuzzyMatch(text, c.command.name));
}

export function exec() {
  getBottomItem()?.command.exec();
}

const getBottomItem = (): CommandComponentProps | undefined => 
  visibleCommands[visibleCommands.length -1];

</script>

<listView
  minHeight={0}
  items={visibleCommands}
  borderColor='#000'
  separatorColor='rgba(0,0,0,0)'
>
  <Template let:item>
    <svelte:component this={componentType} command={item.command} {...item.rest} on:message />
  </Template>
</listView>


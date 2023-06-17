<script lang='ts'>

import NavigationBarTextField from "../common/NavigationBarTextField.svelte";
import NavigationBar from "../common/NavigationBar.svelte";
import { CommandComponentProps } from "~/../types/commandListItemType";
import { fuzzyMatch } from "../search/fuzzyMatch";
import { Template } from 'svelte-native/components'


/* HACK:
 * Command component has a command as its first prop
 * Rest of props is on me, don't know how to type it (JS way)
 */
type CommandComponent = $$Generic<typeof SvelteComponentTyped<any, any, any>>;
export let componentType: CommandComponent;
export let commandComponentProps: CommandComponentProps[];

$: visibleCommands = commandComponentProps;

let searchText = '';
let navTextField: any;


$: {
  visibleCommands = searchText == '' ?
    commandComponentProps :
    commandComponentProps.filter(c => fuzzyMatch(searchText, c.command.name));
}

export function focus() {
  navTextField.focus();
}

const exec = () => {
  let item = getBottomItem();
  if (item) {
    item.command.exec();
    console.log(item.command.name);
  }
}

const undo = () => navTextField.updateText('');

const getBottomItem = (): CommandComponentProps | undefined =>
  visibleCommands[visibleCommands.length -1];

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <listView
    minHeight={0}
    items={visibleCommands}
    borderColor='#000'
    separatorColor='rgba(0,0,0,0)'
  >
    <Template let:item>
      <svelte:component
        this={componentType}
        command={item.command} {...item.rest}
        on:message
      />
    </Template>
  </listView>

  <NavigationBar next={exec} prev={undo} >
    <NavigationBarTextField
      bind:this={navTextField}
      bind:text={searchText}
      keyboardType='url'
      on:returnPress={exec}
    />
  </NavigationBar>
</flexboxLayout>


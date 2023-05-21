<script lang='ts'>

import { CommandComponentProps } from "~/../types/commandListItemType";
import NavigationBar from "../common/NavigationBar.svelte";
import { fuzzyMatch } from "../search/fuzzyMatch";

type CommandComponent = $$Generic<typeof SvelteComponentTyped<any, any, any>>;

// Command component has a command as its first prop
// Rest is on me, don't know how to type it
export let componentType: CommandComponent;
export let commandComponentProps: CommandComponentProps[];

$: visibleCommands = commandComponentProps;

let textField: any;

export function exec() {
  getBottomItem()?.command.exec();
}

export function undo() {
  let command = getBottomItem()?.command;
  if (command && command.undo) {
    command.undo();
  } else {
    setInput('');
  }
}

function onTextChange(event: any) {
  let text = event.value;

  visibleCommands = text == '' ?
    commandComponentProps :
    commandComponentProps.filter(c => fuzzyMatch(text, c.command.name));
}

function getBottomItem(): CommandComponentProps | undefined {
  return visibleCommands[visibleCommands.length -1];
}


function setInput(to: string) {
    textField.nativeView.text = to;
    textField.nativeView.setSelection(to.length);
    setTimeout(() => textField.nativeElement.focus(), 0);

    onTextChange({value: ''});
}

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <scrollView >
    <flexboxLayout
      flexDirection='column'
    >
      {#each visibleCommands as {command, rest} (command.name)}
        <svelte:component this={componentType} command={command} {...rest} on:message />
      {/each}
    </flexboxLayout>
  </scrollView>
    
  <NavigationBar
    prev={undo}
    next={exec}
  >
    <textField
      bind:this={textField}
      flexGrow={1}

      on:textChange={onTextChange}
      on:returnPress={exec}

      editable='true'
      returnKeyType='next'

      textAlignment='center'
      fontFamily='monospace'
      fontSize='20rem'
      borderWidth='0'
    />
  </NavigationBar>
</flexboxLayout>


<script lang='ts'>

import CustomButton from "../common/CustomButton.svelte";
import NavigationBar from "../common/NavigationBar.svelte";
import { fuzzyMatch } from "../search/fuzzyMatch";
import { settingsCommands } from "./settings";

$: commands = settingsCommands;

let textField: any;

function onTextChange(event: any) {
  let text = event.value;

  commands = text == '' ?
    settingsCommands :
    settingsCommands.filter(c => fuzzyMatch(text, c.name));
}

function prev() {
  setInput('');
}

function next() {
  if (commands.length) {
    commands[commands.length -1].execute() 
  }
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
  {#each commands as command}
    <CustomButton on:tap={command.execute} text={command.name} />
  {/each}
    
  <NavigationBar
    prev={prev}
    next={next}
  >
    <textField
      bind:this={textField}
      flexGrow={1}

      on:textChange={onTextChange}
      on:returnPress={next}

      editable='true'
      returnKeyType='next'

      textAlignment='center'
      fontFamily='monospace'
      fontSize='20rem'
      borderWidth='0'
    />
  </NavigationBar>
</flexboxLayout>

<style>
  label {
    flex-grow: 1;
    text-align: center;
  }
</style>

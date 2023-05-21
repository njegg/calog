<script lang='ts'>
import { CommandComponentProps } from "~/../types/commandListItemType";
import CommandCard from "../command/CommandCard.svelte";
import FuzzyCommander from "../command/FuzzyCommander.svelte";
import NavigationBar from "../common/NavigationBar.svelte";
import { settingsCommands } from "./settings";

let componentProps = settingsCommands.map(command => <CommandComponentProps>{command, rest:{}})
</script>

<label text='commented' />

<!--
<FuzzyCommander
  componentType={CommandCard}
  commandComponentProps={componentProps}
/>

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
-->


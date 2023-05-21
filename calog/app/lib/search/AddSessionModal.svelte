<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise'
import { Command } from '../command/command';
import { onMount } from 'svelte';

export let exercise: Exercise;

let textField: any;

$: isShowingStats = false;

onMount(() => setTimeout(() => textField.nativeElement.focus(), 0));

export function exec() {
  console.log('modal exec ' + exercise.name);
}

export function undo() {
  console.log('modal undo' + exercise.name);
}

export function toggleStats() { isShowingStats = !isShowingStats }

</script>


<stackLayout
  backgroundColor='#26233a'
  borderRadius={20}
  padding={20}
>
  <label
    color='#ebbcba'
    textAlignment='center'
    fontSize={20}
    text={exercise.name}
    marginBottom={20}
  />

  {#if isShowingStats}
    <label
      text='STATS'
      borderWidth={1}
      borderRadius={10}
      width={100}
      textAlignment='center'
      borderColor='#ebbcba'
    />
  {/if}

  <flexboxLayout>
    <textField
      bind:this={textField}
      borderColor='#ebbcba'
      borderWidth={1}
      width={30}
      fontSize={20}
      returnKeyType='next'
      keyboardType='integer'
    />

    <label
      text='✕'
      fontSize={30}
      textAlignment='center'
      flexGrow={1}
    />

    <textField
      borderColor='#ebbcba'
      borderWidth={1}
      width={30}
      fontSize={20}
      keyboardType='integer'
      returnKeyType='next'

      on:returnPress={() => console.log('modal return')}
    />
  </flexboxLayout>

</stackLayout>


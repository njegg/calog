<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise';
import { Command } from '../command/command';
import FuzzyCommander from '../command/FuzzyCommander.svelte';
import { CommandComponentProps } from '~/../types/commandListItemType';
import ExerciseCard from './ExerciseCard.svelte';
import NavigationBar from '../common/NavigationBar.svelte';
import NavigationBarTextField from '../common/NavigationBarTextField.svelte';
import AddSessionModal from './AddSessionModal.svelte';
    import { onMount } from 'svelte';


export let exercises: Exercise[];

let commandComponentProps: CommandComponentProps[] = [];

let searchText: string = '';
let fuzzyCommander: any;
let navTextField: any;

let exerciseModal: any;
let selectedExercise: Exercise;

$: isModalOpen = false;

// TODO: maybe onMount
onMount(() => {
  exercises.forEach(e => {
    let command = <Command> {name: e.name, exec: () => {}, undo: undefined};
    commandComponentProps.push({command, rest: {exercise: e}})
  });
});


let shouldExecute = true; // By default 

// Called by the event caused by list item
function setExercise(event: any) {
  selectedExercise = <Exercise> event.detail.exercise;

  if (shouldExecute) {
    shouldExecute = false;
    exec();
  }
}

function exec() {
  if (!isModalOpen) {
    if (shouldExecute) {
      shouldExecute = false; // Set guard for the call bellow
      fuzzyCommander.exec(); // Gets the exercise
    }

    shouldExecute = true; // Executed, reset to default

    /* navTextField.updateText(''); */

    isModalOpen = true;
  } else {
    exerciseModal.exec();
  }
}

function undo() {
  if (isModalOpen) {
    exerciseModal.undo();
    isModalOpen = false;

  } else {
    navTextField.updateText('');
  }
}

function textChange(e: any) {
  let text = e.value;
  fuzzyCommander.update(text);
}

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>

  {#if isModalOpen}
    <AddSessionModal 
      bind:this={exerciseModal}
      exercise={selectedExercise}
    />
  {:else}
    <FuzzyCommander
      bind:this={fuzzyCommander}
      commandComponentProps={commandComponentProps}
      componentType={ExerciseCard}
      on:message={setExercise}
    />
  {/if}

  <NavigationBar next={exec} prev={undo} >
    {#if !isModalOpen}
      <NavigationBarTextField
        bind:this={navTextField}
        bind:text={searchText}
        keyboardType='url'
        on:returnPress={exec}
        on:textChange={textChange}
      />
    {:else}
      <button
        text='Show Stats'
        color='#908caa'
        backgroundColor='#21202e'
        flexGrow={1}
        fontSize={20}

        on:tap={exerciseModal.toggleStats}
      />
    {/if}
  </NavigationBar>
</flexboxLayout>


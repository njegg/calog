<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise';
import { Command } from '../command/command';
import { CommandComponentProps } from '~/../types/commandListItemType';
import ExerciseCard from './ExerciseCard.svelte';
import AddSessionModal from './AddSessionModal.svelte';
import { onMount } from 'svelte';
import FuzzyCommandList from '../command/FuzzyCommandList.svelte';


export let exercises: Exercise[];

let commandComponentProps: CommandComponentProps[] = [];
let selectedExercise: Exercise;

onMount(() => {
  exercises.forEach(e => {
    let command = <Command> {name: e.name, exec: () => {}, undo: undefined};
    commandComponentProps.push({command, rest: {exercise: e}})
  });
});


$: isModalOpen = false;

function setExercise(event: any) {
  selectedExercise = <Exercise> event.detail.exercise;
  isModalOpen = true;
}

function closeModal() {
  isModalOpen = false;
}

</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  {#if isModalOpen}
    <AddSessionModal
      exercise={selectedExercise}
      on:close={closeModal}
    />
  {:else}
    <FuzzyCommandList
      componentType={ExerciseCard}
      commandComponentProps={commandComponentProps}
      on:message={setExercise}
    />
  {/if}

</flexboxLayout>


<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise';
import { Command } from '../command/command';
import FuzzyCommander from '../command/FuzzyCommander.svelte';
import CommandCard from '../command/CommandCard.svelte';
import AddSessionModalNew from './AddSessionModalNew.svelte';
import { CommandComponentProps } from '~/../types/commandListItemType';
    import ExerciseCardNew from './ExerciseCardNew.svelte';

export let exercises: Exercise[];

let commandComponentProps: CommandComponentProps[] = [];

let modalOpen: boolean = false;

exercises.forEach(e => {
  let command = <Command> {
      name: e.name,
      exec: () => {},
      undo: undefined
  };

  commandComponentProps.push({command, rest: {exercise: e}})
});

function closeModal() {
  console.log('bye modal');
  modalOpen = false;
}

function openModal(e: any): void {
  let exercise = e.detail.exercise;
  
  console.log('modal epik ', exercise.name);
  modalOpen = true;
  closeModal();
}

</script>

<FuzzyCommander
  commandComponentProps={commandComponentProps}
  componentType={ExerciseCardNew}
  on:message={openModal}
/>


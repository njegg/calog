<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise'
import { createEventDispatcher, onMount } from 'svelte';
import NavigationBar from '../common/NavigationBar.svelte';
import NumberInputField from '../common/NumberInputField.svelte';
import { SessionRepo } from '~/persistance/db';
import { Session } from '~/persistance/model/session';


export let exercise: Exercise;

const dispatch = createEventDispatcher();

let firstField: NumberInputField;
let secondField: NumberInputField;

onMount(() => setTimeout(() => firstField.focus(), 0));

$: isShowingStats = false;
let isFirstFieldSelected: boolean = true;


export function next() {
  if (isFirstFieldSelected) {
    isFirstFieldSelected = false;
    secondField.focus();
  } else {
    let sets = firstField.value();
    let reps = secondField.value();

    if (sets && reps) {
      SessionRepo.add(Session.of(new Date(), exercise, reps, sets));
      close();
    }
  }
}

export function prev() {
  if (isFirstFieldSelected) {
    close();
  } else {
    isFirstFieldSelected = true;
    firstField.focus();
  }
}

function close() {
    dispatch("close");
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
      width={80}
      textAlignment='center'
      borderColor='#ebbcba'
    />
  {/if}

  <flexboxLayout>
    <NumberInputField
      bind:this={firstField}
      on:returnPress={next}
    />

    <label
      text='✕'
      fontSize={30}
      textAlignment='center'
      flexGrow={1}
    />

    <NumberInputField
      bind:this={secondField}
      on:returnPress={next}
    />
  </flexboxLayout>

</stackLayout>

<NavigationBar next={next} prev={prev} >
  <button
    text='Show Stats'
    color='#908caa'
    backgroundColor='#21202e'
    flexGrow={1}
    fontSize={20}

    on:tap={toggleStats}
  />
</NavigationBar>


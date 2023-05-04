<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/exercise";
  import ExerciseList from "./ExerciseList.svelte";

  export let exercise: Exercise;

  let dispach = createEventDispatcher();

  function select() {
    dispach('tap', {exercise});
  }

  function showStats() {
    console.log(`${exercise.name} stats`)
  }
</script>

<flexboxLayout >
  <label
    on:tap={select}
    text={exercise.name}

    textWrap='true'
    flexGrow={1}
    backgroundColor='#31748f'
    color='#e0def4'
    borderRadius={100}
    textAlignment='center'
  />

  <button
    on:tap={showStats}
    text='?'

    borderRadius={100}
    backgroundColor='#eb6f92'
    width={10}
    padding={0}
  />
</flexboxLayout>

<script lang='ts'>
  import { createEventDispatcher } from "svelte";
  import { Exercise } from "~/exercise";

  export let exercise: Exercise;

  let dispach = createEventDispatcher();

  function select() {
    dispach('tap', {exercise});
  }

  function showStats() {
    console.log(`${exercise.name} stats`)
  }
</script>

<flexboxLayout
    backgroundColor='#524f67'
    color='#e0def4'
    borderRadius={20}
    padding={10}
>
  <label
    on:tap={select}
    text={exercise.name}

    textWrap='true'
    flexGrow={1}
    textAlignment='center'
  >
  </label>

  <label
    on:tap={showStats}

    width={40}
    height={40}
    text='…'
    textAlignment='center'
    borderRadius='100'
    backgroundColor='#eb6f92'
  />
</flexboxLayout>

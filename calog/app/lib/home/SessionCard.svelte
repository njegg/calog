<script lang='ts'>
  import { selectedSession } from "~/lib/selectedSessionCardStore";
  import Card from "~/lib/common/Card.svelte";
  import CircleButton from "~/lib/common/CircleButton.svelte";
  import { Session } from "~/persistance/model/session";
  import { createEventDispatcher } from "svelte";

  export let session: Session;

  // TODO: more efficient way to this, move to parent?
  $: confirmDelete = false;

  selectedSession.subscribe(x => confirmDelete = x == session.id);

  function onXTap() {
    selectedSession.update(s => session.id == s ? undefined : session.id);
  }

  const dispatch = createEventDispatcher();
  function deleteThis() {
    selectedSession.update(_ => undefined)

    dispatch('delete', {id: session.id});
  }
</script>

<Card>
  <flexboxLayout flexGrow={1}>
    <label 
      text={session.exercise.name}
      flexGrow={1}
    />

    {#if confirmDelete }
      <CircleButton
        on:tap={deleteThis}
        text='✓'
        backgroundColor='#31748f'
      />
    {/if}

    <CircleButton
      on:tap={onXTap}
      text='✕'
      backgroundColor='#eb6f92'
    />
  </flexboxLayout>
  
  <flexboxLayout
    flexGrow={1}
    flexWrapBefore={true}
  >
    <label 
      text={session.sets + ' x ' + session.reps}
      color='#ebbcba'
      borderRadius={100}
      borderColor='#ebbcba'
      borderWidth={1}
      padding='4 10'
      textAlignment='center'
    />
  </flexboxLayout>
</Card>

<style>
</style>

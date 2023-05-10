<script lang='ts'>
  import { Session } from "~/lib/session";
  import { selectedSession, SessionManager } from "~/lib/sessionStore";
  import Card from "~/lib/common/Card.svelte";
  import CircleButton from "~/lib/common/CircleButton.svelte";

  export let session: Session;

  $: confirmDelete = false;

  selectedSession.subscribe(x => confirmDelete = x == session.id);

  function onTap() {
    selectedSession.update(x => {
      return x == session.id ? -1 : session.id;
    })
  }

  function deleteThis() {
    SessionManager.deleteSession(session);
    selectedSession.set(-1);
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
      on:tap={onTap}
      text='✕'
      backgroundColor='#eb6f92'
    />
  </flexboxLayout>
  
  <flexboxLayout
    flexGrow={1}
    flexWrapBefore={true}
  >
    <label 
      text={'' + session.sets}
      color='#ebbcba'
      borderRadius={100}
      borderColor='#ebbcba'
      borderWidth={1}
      width={50}
      textAlignment='center'
    />

    <label 
      text='✕'
      color='#ebbcba'
    />

    <label 
      text={'' + session.reps}
      color='#ebbcba'
      borderRadius={100}
      borderColor='#ebbcba'
      borderWidth={1}
      width={50}
      textAlignment='center'
    />
  </flexboxLayout>
</Card>

<style>
</style>

<script lang='ts'>
  import { selectedSession } from "~/lib/selectedSessionCardStore";
  import Card from "~/lib/common/Card.svelte";
  import CircleButton from "~/lib/common/CircleButton.svelte";
  import { Session } from "~/persistance/model/session";
  import { createEventDispatcher } from "svelte";
  import { SessionData, SessionRepo } from "~/persistance/db";
  import SessionCardData from "./SessionCardData.svelte";

  export let session: Session;

  // TODO: undefined dateHash
  let sessionData: SessionData = {reps: session.reps, sets: session.sets, dateHash: session.dateHash || 0};

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


  let showMore = false;
  let lastSessionsData: SessionData[] = [];

  const showMoreToggle = () => {
    lastSessionsData = showMore ? [] : SessionRepo.lastSessions(session, 5);
    showMore = !showMore
  }
</script>

<Card margin={0}>
  <flexboxLayout flexGrow={1} on:tap={showMoreToggle}>
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

  <stackLayout
    flexWrapBefore={true}
    class:showMore
    marginTop={10}
  >
    <SessionCardData data={sessionData} bind:showMore />

    {#if showMore}
      {#each lastSessionsData as data }
        <SessionCardData data={data} bind:showMore />
      {/each}
    {/if}
  </stackLayout>
</Card>

<style>
  .showMore {
    padding: 2 4;
    border-color: #ebbcba;
    border-width: 1;
    border-radius: 20;
  }
</style>

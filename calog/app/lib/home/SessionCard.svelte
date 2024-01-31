<script lang='ts'>
import { selectedSession, selectedDeleteSession } from "~/lib/selectedSessionCardStore";
import Card from "~/lib/common/Card.svelte";
import CircleButton from "~/lib/common/CircleButton.svelte";
import { Session } from "~/persistance/model/session";
import { createEventDispatcher } from "svelte";
import { SessionData, SessionRepo } from "~/persistance/db";
import SessionCardData from "./SessionCardData.svelte";

export let session: Session;

const dispatch = createEventDispatcher();

let sessionData: SessionData = { reps: session.reps, sets: session.sets, dateHash: session.dateHash || 0 };

$: confirmDelete = false;
$: showMore = false;

selectedSession.subscribe(s => showMore = s == session.id);
selectedDeleteSession.subscribe(s => confirmDelete = s == session.id);

function onXTap() {
  selectedDeleteSession.update(s => session.id == s ? undefined : session.id);
}

function deleteThis() {
  selectedSession.update(_ => undefined)
  dispatch('delete', {id: session.id});
}


let lastSessionsData: SessionData[] = [];

const toggleSelected = () => {
  lastSessionsData = showMore ? [] : SessionRepo.lastSessions(session, 5);
  selectedSession.set(showMore ? undefined : session.id)
}

</script>

<Card margin={8}>
  <flexboxLayout flexGrow={1}>
    <label
      on:tap={toggleSelected}
      text={session.exercise.name}
      flexGrow={1}
    />

    {#if confirmDelete && showMore}
      <CircleButton
        on:tap={deleteThis}
        backgroundColor='#31748f'
      />
    {/if}

    {#if showMore}
      <CircleButton
        on:tap={onXTap}
        backgroundColor='#eb6f92'
      />
    {/if}
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

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

let sessionData: SessionData = { reps: session.reps, sets: session.sets, dateHash: session.dateHash || 0, note: session.note };

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
  <flexboxLayout
    flexDirection='column'
  >
    <flexboxLayout flexGrow={1}>
      <label
        on:tap={toggleSelected}
        text={session.exercise.name}
        flexGrow={1}
      />

      {#if confirmDelete && showMore}
        <CircleButton
          width={25}
          height={25}
          margin={3}
          on:tap={deleteThis}
          backgroundColor='#31748f'
        />
      {/if}

      {#if showMore}
        <CircleButton
          width={25}
          height={25}
          margin='3 0 3 20'
          on:tap={onXTap}
          backgroundColor='#eb6f92'
        />
      {/if}
    </flexboxLayout>

    {#if session.note?.length > 0}
      <label
        text={session.note}
        color='#6e6a86'
        fontSize={16}
      />
    {/if}

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
  </flexboxLayout>
</Card>

<style>
  .showMore {
    border-color: #ebbcba;
    border-width: 1;
    border-radius: 20;
  }
</style>

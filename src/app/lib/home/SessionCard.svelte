<script lang='ts'>

  import { selectedSession, selectedDeleteSession } from "~/lib/selectedSessionCardStore";
  import Card from "~/lib/common/Card.svelte";
  import CircleButton from "~/lib/common/CircleButton.svelte";
  import { Session } from "~/persistance/model/session";
  import { createEventDispatcher } from "svelte";
  import { SessionRepo } from "~/persistance/db";
  import SessionCardData from "./SessionCardData.svelte";
  import { ThemeColors, themeStore } from "../common/theme";

  export let session: Session;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  const dispatch = createEventDispatcher();

  $: confirmDelete = false;
  $: showMore = false;

  selectedSession.subscribe(s => showMore = s == session.id);
  selectedDeleteSession.subscribe(s => confirmDelete = s == session.id);

  function onXTap(): void {
    selectedDeleteSession.update(s => session.id == s ? undefined : session.id);
  }

  function deleteThis(): void {
    selectedSession.update(_ => undefined)
    dispatch('delete', {id: session.id});
  }


  let lastSessions: Session[] = [];

  const toggleSelected = () => {
    lastSessions = showMore ? [] : SessionRepo.lastSessions(session, 5);
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
          backgroundColor={theme.pine}
        />
      {/if}

      {#if showMore}
        <CircleButton
          width={25}
          height={25}
          margin='3 0 3 20'
          on:tap={onXTap}
          backgroundColor={theme.love}
        />
      {/if}
    </flexboxLayout>

    {#if session.note?.length > 0}
      <label
        text={session.note}
        color={theme.muted}
        fontSize={16}
      />
    {/if}

    <stackLayout
      flexWrapBefore={true}
      borderColor={theme.rose}
      class:showMore
      marginTop={10}
    >
    <SessionCardData on:update session={session} bind:showMore />

      {#if showMore}
        {#each lastSessions as session }
          <SessionCardData on:update session={session} bind:showMore />
        {/each}
      {/if}
    </stackLayout>
  </flexboxLayout>
</Card>

<style>
  .showMore {
    border-width: 1;
    border-radius: 20;
  }
</style>

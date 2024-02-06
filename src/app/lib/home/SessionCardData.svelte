<script lang='ts'>
  import { DateHash } from "../util/date_hash";
  import { ThemeColors, themeStore } from "../common/theme";
  import { createEventDispatcher } from "svelte";
  import { Session } from "~/persistance/model/session";

  let dispatch = createEventDispatcher();

  export let session: Session;
  export let showMore: boolean;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let today: number = DateHash.today;
  let daysAgo: number = DateHash.dayDif(session.dateHash, today);
  let text: string = '';

  if (daysAgo == 0) text = 'today';
  else if (daysAgo == 1) text = 'yesterday';
  else text = daysAgo + ' days ago'

  function onTap(): void {
    if (showMore) return;
    dispatch('update', {session});
    // dispatch('update');
  }
</script>

<flexboxLayout
  width='100%'
  paddingRight={8}
>
  <label
    on:tap={onTap}

    text={session.sets + ' x ' + session.reps}
    color={theme.rose}
    borderRadius={100}
    borderColor={theme.rose}
    borderWidth={+!showMore}
    padding='4 10'
    textAlignment='center'
  />

  {#if showMore}
    <label
      class:showMore
      text={text}
      color={theme.muted}
      flexGrow={1}
      textAlignment='right'
    />
  {/if}
</flexboxLayout>


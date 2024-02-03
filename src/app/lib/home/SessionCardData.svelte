<script lang='ts'>
  import { SessionData } from "~/persistance/db";
  import { DateHash } from "../util/date_hash";
    import { ThemeColors, themeStore } from "../common/theme";

  export let data: SessionData;
  export let showMore: boolean;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let today: number = DateHash.today;
  let daysAgo: number = DateHash.dayDif(data.dateHash, today);
  let text: string = '';

  if (daysAgo == 0) text = 'today';
  else if (daysAgo == 1) text = 'yesterday';
  else text = daysAgo + ' days ago'
</script>

<flexboxLayout
  width='100%'
  paddingRight={8}
>
  <label
    text={data.sets + ' x ' + data.reps}
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


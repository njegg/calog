<script lang='ts'>
  import { SessionData } from "~/persistance/db";
  import { DateHash } from "../util/date_hash";

  export let data: SessionData;
  export let showMore: boolean;

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
    color='#ebbcba'
    borderRadius={100}
    borderColor='#ebbcba'
    borderWidth={+!showMore}
    padding='4 10'
    textAlignment='center'
  />

  {#if showMore}
    <label
      class:showMore
      text={text}
      color='#6e6a86'
      flexGrow={1}
      textAlignment='right'
    />
  {/if}
</flexboxLayout>


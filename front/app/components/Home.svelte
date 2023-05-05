<script lang='ts'>
    import { Template } from "svelte-native/components";
  import { Session } from "~/lib/session";
  import { sessionStore } from "~/lib/sessionStore";
    
  $: sessions = new Array<Session>;

  sessionStore.subscribe(x => sessions = x);
</script>


<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <listView
    items={sessions}
    borderColor='#000'
    separatorColor='rgb(0,0,0,0)'
  >
    <Template let:item>
      <label text={`${item.exercise.name} [${item.sets}] [${item.reps}]`}>
    </Template>
  </listView>
</flexboxLayout>

<style>
</style>

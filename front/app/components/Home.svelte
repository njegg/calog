<script lang='ts'>
  import { onMount } from "svelte";
  import { Template } from "svelte-native/components";
    import { DatePicker } from "tns-core-modules";
  import { Session } from "~/lib/session";
  import { loadSessions, printFile, sessionStore } from "~/lib/sessionStore";
  import NavigationBar from "./NavigationBar.svelte";
    
  const dayInMS = 24 * 60 * 60 * 1000;

  $: sessions = new Array<Session>();

  $: isDatePickerVisible = false;
  $: date = new Date();

  let allSessions: Map<string, Session[]> = new Map();
  $: {
    sessions = allSessions.get(date.toLocaleDateString()) || [];
  }

  let mounted = false;

  onMount(() => {
    mounted = true;
    sessionStore.set(loadSessions());
	});

  sessionStore.subscribe(x => {
    if (mounted) {
      allSessions = x;
      sessions = x.get(date.toLocaleDateString()) || [];
    }
  });

  function next() {
    if (isDatePickerVisible) {
      isDatePickerVisible = false;
    } else {
      date.setTime(date.getTime() + dayInMS);
      date = date;
    }
  }

  function prev() {
    if (isDatePickerVisible) {
      isDatePickerVisible = false;
      date = new Date();
    } else {
      date.setTime(date.getTime() - dayInMS);
      date = date;
    }
  }

  function datePickerTap() {
    isDatePickerVisible = !isDatePickerVisible;
  }
</script>


<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <listView
    flexGrow={1}
    items={sessions}
    borderColor='#000'
    separatorColor='rgb(0,0,0,0)'
  >
    <Template let:item>
      <label text={`${item.exercise.name} [${item.sets}] [${item.reps}]`}>
    </Template>
  </listView>

  {#if isDatePickerVisible }
    <datePicker
      bind:date
      height={200}
      minHeight={200}
    />
  {/if}

  <label 
    on:tap={() => date = new Date()}
    text='today'
    color='#403d52'
    textAlignment='center'
    minHeight={30}
  />

  <NavigationBar
    next={next}
    prev={prev}
  >
    <label
      on:tap={datePickerTap}

      text={date.toLocaleDateString()}
      color='#6e6a86'
      flexGrow={1}
      textAlignment='center'
    />
  </NavigationBar>

</flexboxLayout>

<style>
  datePicker {
    color: white;
  }
</style>

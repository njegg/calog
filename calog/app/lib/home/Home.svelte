<script lang='ts'>
  import { onMount } from "svelte";
  import { Template } from "svelte-native/components";
  import { ListView } from "tns-core-modules";
  import { Session } from "~/lib/session";
  import { loadSessions, sessionStore } from "~/lib/sessionStore";
  import SessionCard from "./SessionCard.svelte";
  import NavigationBar from "~/lib/common/NavigationBar.svelte";
    
  const dayInMS = 24 * 60 * 60 * 1000;

  let allSessions: Map<string, Session[]> = new Map<string, Session[]>();

  $: date = new Date();
  $: isDatePickerVisible = false;
  $: sessions = allSessions.get(date.toLocaleDateString()) || [];

  let mounted = false;

  let listView: ListView;

  onMount(() => {
    mounted = true;
    sessionStore.set(loadSessions());
	});

  sessionStore.subscribe(x => {
    if (mounted) {
      allSessions = x;
      sessions = x.get(date.toLocaleDateString()) || [];

      listView.nativeElement.refresh(); // Fixes weird height bug
    }
  });

  function next() {
    if (isDatePickerVisible) {
      isDatePickerVisible = false;
    } else {
      let nextDay = date.getTime() + dayInMS;

      if (nextDay < Date.now()) {
        date.setTime(nextDay);
        date = date;
      }
    }
  }

  function prev() {
    if (isDatePickerVisible) {
      isDatePickerVisible = false;
      date = new Date();
    } else {
      let prevDay = date.getTime() - dayInMS
      date.setTime(prevDay);
      date = date;
    }
  }

  function datePickerTap() {
    isDatePickerVisible = !isDatePickerVisible;
  }


  $: selectedCard = -1;
  function selectCard(e: Event) {
    selectedCard = e.detail.id;

    console.log('home: ' + selectedCard);
  }
</script>


<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <listView
    bind:this={listView}
    items={sessions}
    borderColor='#000'
    separatorColor='rgb(0,0,0,0)'
    flexGrow={0}
  >
    <Template let:item>
      <SessionCard session={item} />
    </Template>
  </listView>

  {#if isDatePickerVisible }
    <datePicker
      bind:date
      borderRadius={20}
      height={200}
      minHeight={200}
      backgroundColor='#26233a'
    />
  {/if}

  <!--label 
    on:tap={() => date = new Date()}
    text='today'
    color='#403d52'
    textAlignment='center'
    minHeight={30}
  /-->

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

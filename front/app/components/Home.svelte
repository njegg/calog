<script lang='ts'>
  import { Template } from "svelte-native/components";
  import { Session } from "~/lib/session";
  import { sessionStore } from "~/lib/sessionStore";
  import NavigationBar from "./NavigationBar.svelte";
    
  $: sessions = new Map<string, Session[]>();
  $: isDatePickerVisible = false;

  let date = new Date();

  const dayInMS = 24 * 60 * 60 * 1000;

  sessionStore.subscribe(x => sessions = x);

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
    items={sessions.get(date.toLocaleDateString())}
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
    />
  {/if}

  <label 
    on:tap={() => date = new Date()}
    text='today'
    color='#403d52'
    textAlignment='center'
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

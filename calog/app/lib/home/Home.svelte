<script lang='ts'>
  import { Template } from "svelte-native/components";
  import SessionCard from "./SessionCard.svelte";
  import NavigationBar from "~/lib/common/NavigationBar.svelte";
  import { SessionRepo } from "~/persistance/db";

  const dayInMS = 24 * 60 * 60 * 1000;

  $: date = new Date();
  $: isDatePickerVisible = false;
  $: sessions = SessionRepo.allByDate(date);

  // TODO: do some caching for sessions
  SessionRepo.onChangeListener(() => {
    sessions = SessionRepo.allByDate(date);
  })

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

  function deleteSession(event: Event) {
    let id: string = event.detail.id;

    // Instantly delete from ui, db refresh from event takes some time
    sessions = sessions.filter(s => s.id != id); 
    SessionRepo.del(id);
   }
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
      <SessionCard session={item} on:delete={deleteSession} />
    </Template>
  </listView>

  {#if isDatePickerVisible }
    <datePicker
      bind:date
      borderRadius={20}
      height={200}
      minHeight={200}
      backgroundColor='#26233a'
      margin={8}
    />
  {/if}

  <NavigationBar next={next} prev={prev}
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

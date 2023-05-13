<script lang='ts'>
import { Template } from "svelte-native/components";
import SessionCard from "./SessionCard.svelte";
import NavigationBar from "~/lib/common/NavigationBar.svelte";
import { SessionRepo } from "~/persistance/db";
import { Session } from "~/persistance/model/session";
import { selectedSession } from "../selectedSessionCardStore";
import { DateHash } from "../util/date_hash";
    import { ListView } from "tns-core-modules";

const dayInMS = 24 * 60 * 60 * 1000;

let date = new Date();
let dateHash = DateHash.fromDate(date);
let todayHash = dateHash;
let sessionCache: Map<number, Session[]> = createSessionCache();

let sessions: Session[] = [];

$: {
  dateHash = DateHash.fromDate(date);

  if (dateHash > todayHash) { // no time travel
    date = new Date();
  }

  // Unselect the one selected for deleting
  selectedSession.update(_ => undefined);

  updateSessionCache();
}

function updateSessionCache() {
  let cached = sessionCache.get(dateHash);

  if (!cached) {
    cached = SessionRepo.allBy('dateHash', dateHash);
    sessionCache.set(dateHash, cached);
  }

  sessions = cached;
}

SessionRepo.onChangeListener(() => {
  sessionCache = createSessionCache();
  sessions = sessionCache.get(dateHash) || [];
});

function createSessionCache(): Map<number, Session[]> {
  let cache = new Map<number, Session[]>();

  let hash = DateHash.fromDate(date);
  let todayHash = DateHash.fromDate(new Date());

  cache.set(hash, SessionRepo.allBy('dateHash', hash));

  if (hash != todayHash) {
    cache.set(todayHash, SessionRepo.allBy('dateHash', todayHash));
  }

  return cache;
}


$: isDatePickerVisible = false;

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
    let prevDay = date.getTime() - dayInMS;
    date.setTime(prevDay);
    date = date;
  }
}

function datePickerTap() {
  isDatePickerVisible = !isDatePickerVisible;
}

function deleteSession(event: any) {
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
  <scrollView >
    <flexboxLayout
      flexDirection='column'
    >
      <label height={250} />
      {#each sessions as item}
          <SessionCard
            session={item}
            on:delete={deleteSession}
          />
      {/each}
    </flexboxLayout>
  </scrollView>

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

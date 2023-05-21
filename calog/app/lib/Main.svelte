<script lang="ts">

import { ExerciseRepo } from "~/persistance/db";
import Home from "./home/Home.svelte";
import Search from "./search/Search.svelte";
import FuzzyCommander from "./command/FuzzyCommander.svelte";
import { settingsCommands } from "./settings/settings";
    import SearchNew from "./search/SearchNew.svelte";

let theme = {
  background: "#191724",
  text: "#e0def4",
};

let exercises = ExerciseRepo.all();

</script>

<page
  actionBarHidden={true}
  androidStatusBarBackground='#191724'

  style="
    font-size: 20rem;
    font-family: monospace;
  "
>
  <label text="yes"/>

  <tabView
    backgroundColor="{theme.background}"
    androidTabsPosition="bottom"
    tabTextColor='#6e6a86'
    tabBackgroundColor='#191724'
    selectedTabTextColor='#ebbcba'
    androidSelectedTabHighlightColor='#191724'
  >
    <tabViewItem
        title="home"
        style="text-transform: lowercase;"
    >
      <Home />
    </tabViewItem>

    <tabViewItem
      title="fuzzy"
      style="text-transform: lowercase;"
    >
      <SearchNew exercises="{exercises}" />
    </tabViewItem>

    <tabViewItem
      title="settings"
      style="text-transform: lowercase;"
    >
      <label text='a'/>
    </tabViewItem>
  </tabView>
</page>


<style>
  actionBar page tabViewItem {
    background: #ff0000;
  }
  @font-face {
      font-family: 'GothamRounded';
      src: url('../fonts/GothamRounded-Book.otf');
  }
</style>


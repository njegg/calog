<script lang="ts">
  import { PropertyChangeData } from "@nativescript/core";
    import { dismissKeyboard } from "@nativescript/core/utils";
  import { exercises } from "~/exercise";
    import Home from "./Home.svelte";
    import NavigationBar from "./NavigationBar.svelte";
  import Search from "./Search.svelte";

  function homeToggle(changeData: PropertyChangeData) {
    if (changeData.value != 1) {
      dismissKeyboard();
    }
  }

  let theme = {
    background: "#191724",
    text: "#e0def4",
  };

  let selectedIndex = 1;
</script>

<page
  actionBarHidden={true}
  androidStatusBarBackground='#191724'

  style="
    font-size: 20rem;
    font-family: monospace;
  "
>
  <actionBar backgroundColor="{theme.background}" title="Calisthenics tracker"></actionBar>

  <tabView
    on:selectedIndexChange="{homeToggle}"
    bind:selectedIndex={selectedIndex}

    backgroundColor="{theme.background}"
    androidTabsPosition="bottom"
    tabTextColor='#6e6a86'
    tabBackgroundColor='#191724'
    selectedTabTextColor='#ebbcba'
    androidSelectedTabHighlightColor='#191724'
  >
    <tabViewItem
        title="Home"
        style="text-transform: lowercase;"
    >
      <Home />
    </tabViewItem>

    <tabViewItem title="Fuzzy" style="text-transform: lowercase;">
      <Search exercises="{exercises}" isInView={selectedIndex == 1} />
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


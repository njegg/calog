<script lang="ts">
  import { PropertyChangeData } from "@nativescript/core";
  import { exercises } from "~/exercise";
  import Search from "./Search.svelte";

  let isHomeSelected: boolean = true;

  function homeToggle(changeData: PropertyChangeData) {
    isHomeSelected = changeData.value != 0;
  }

  let theme = {
    background: "#191724",
    text: "#e0def4",
  };
</script>

<page
  bind:actionBarHidden="{isHomeSelected}"
  style="
    font-size: 20rem;
    font-family: monospace;
  "
>
  <actionBar backgroundColor="{theme.background}" title="Calisthenics tracker"></actionBar>

  <tabView
    backgroundColor="{theme.background}"
    androidTabsPosition="bottom"
    on:selectedIndexChange="{homeToggle}"
    selectedIndex="1"
  >
    <tabViewItem title="Home" style="text-transform: lowercase;">
      <label textWrap="true"></label>
    </tabViewItem>

    <tabViewItem title="Fuzzy" style="text-transform: lowercase;">
      <Search exercises="{exercises}" />
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


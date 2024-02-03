<script lang="ts">
  import { ExerciseRepo } from "~/persistance/db";
  import Home from "./home/Home.svelte";
  import Search from "./search/Search.svelte";
  import Settings from "./settings/Settings.svelte";
  import { ThemeColors, themeStore } from "./common/theme";
  import { Color } from "@nativescript/core";

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  let exercises = ExerciseRepo.all();
</script>

<page
  actionBarHidden={true}
  androidStatusBarBackground={new Color(theme.baseDark)}

  style="
    font-size: 20rem;
    font-family: monospace;
  "
>
  <tabView
    backgroundColor="{theme.baseDark}"
    androidTabsPosition="bottom"
    tabTextColor={theme.muted}
    tabBackgroundColor={theme.baseDark}
    selectedTabTextColor={theme.rose}
    androidSelectedTabHighlightColor={theme.baseDark}
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
      <Search exercises="{exercises}" />
    </tabViewItem>

    <tabViewItem
      title="settings"
      style="text-transform: lowercase;"
    >
      <Settings />
    </tabViewItem>
  </tabView>
</page>


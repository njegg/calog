<script lang="ts">
  import { Application } from "@nativescript/core";
  import Main from "./lib/Main.svelte";
  import { ThemeColors, defaultThemeColors, themeStore } from "./lib/common/theme";

  let theme: ThemeColors = defaultThemeColors;
  themeStore.subscribe(t => theme = t);

  Application.on(Application.discardedErrorEvent, function(args: any) {
    console.log("Caught global error: " + args.error);
  });
</script>

<frame
  backgroundColor={theme.baseDark}
>
  <Main />
</frame>


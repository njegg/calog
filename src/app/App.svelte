<script lang="ts">
  import { Application } from "@nativescript/core";
  import Main from "./lib/Main.svelte";
  import { showModal } from "svelte-native";
  import ErrorModal from "./lib/common/ErrorModal.svelte";
  import { ThemeColors, defaultThemeColors, themeStore } from "./lib/common/theme";
  import { ApplicationSettings } from "tns-core-modules";

  let theme: ThemeColors = defaultThemeColors;
  themeStore.subscribe(t => theme = t);

  Application.on(Application.discardedErrorEvent, function(args: any) {
    console.log("Caught global error: " + args.error);

    let modalReturnData = showModal({page: ErrorModal, props: {msg: args.error.message}})
  });
</script>

<frame
  backgroundColor={theme.baseDark}
>
  <Main />
</frame>


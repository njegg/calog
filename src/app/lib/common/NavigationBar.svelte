<script lang='ts'>
  import CircleButton from "./CircleButton.svelte";
  import { ThemeColors, themeStore } from "./theme";

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  export let next: () => void;
  export let prev: () => void;
</script>

<flexboxLayout
    backgroundColor={theme.highlightDark}

    minHeight={60}
    height={60}
    borderRadius={100}
    margin={10}
    padding='5 3'
>
  <CircleButton
    on:tap={prev}

    text='❮'
    backgroundColor={theme.highlightMid}
    color={theme.muted}

    width={40}
    height={40}
    fontSize={20}
  />

  <slot />

  <CircleButton
    on:tap={next}

    text='❯'
    backgroundColor={theme.highlightMid}
    color={theme.muted}

    width={40}
    height={40}
    fontSize={20}
  />
</flexboxLayout>


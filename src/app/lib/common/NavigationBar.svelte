<script lang='ts'>
    import { HapticImpactType, Haptics } from "@nativescript/haptics";
  import CircleButton from "./CircleButton.svelte";
  import { ThemeColors, themeStore } from "./theme";


  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);

  export let next: () => void;
  export let prev: () => void;
  export let haptic = true;

  function _next() {
    if (haptic && Haptics.isSupported()) Haptics.impact(HapticImpactType.LIGHT)

    next();
  }

  function _prev() {
    if (haptic && Haptics.isSupported()) Haptics.impact(HapticImpactType.LIGHT)

    prev();
  }
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
    on:tap={_prev}

    text='❮'
    backgroundColor={theme.baseMid}
    color={theme.rose}

    width={40}
    height={40}
    fontSize={16}
  />

  <slot />

  <CircleButton
    on:tap={_next}

    text='❯'
    backgroundColor={theme.baseMid}
    color={theme.rose}

    width={40}
    height={40}
    fontSize={16}
  />
</flexboxLayout>


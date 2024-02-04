<script lang='ts'>
  import { ThemeColors, themeStore } from "./theme";

  export let margin: string | number = 0;
  export let padding: string | number = 10;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);
</script>

<flexboxLayout
    backgroundColor={theme.baseLight}
    color={theme.text}
    borderRadius={20}
    padding={padding}
    margin={margin}
    flexWrap='wrap'
>
  <slot />
</flexboxLayout>

<style>
  flexboxLayout {
    width: 100%;
  }
</style>

<script lang='ts'>
  import { ThemeColors, themeStore } from "./theme";

  export let selected: boolean;
  export let alt: string;
  export let text: string;
  export let width: string | number = 100;
  export let fontSize: string | number = 25;
  export let margin: string | number = 0;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);
</script>


<label
  on:tap
  text={text == '' ? alt : text}
  color={theme.text}
  borderColor={selected ? theme.rose : theme.muted }
  width={width}
  fontSize={fontSize}
  margin={margin}
/>

<style>
  label {
    text-align: center;
    border-width: 2;
    border-radius: 20;
    padding: 10, 20;
  }
</style>

<script lang='ts'>
  export let backgroundColor: string = "#1f1d2e";
  export let color: string = "#908caa";
  export let text: string = "";
  export let width: number = 30;
  export let height: number = 30;
  export let fontSize: number | 'inherit' = 'inherit';
  export let boxShadow: string = 'none'
  export let margin: string | number = 5;
</script>

<button
    on:tap
    width={width}
    height={height}
    margin={margin}
    backgroundColor={backgroundColor}
    text={text}
    color={color}
    boxShadow={boxShadow}
    borderColor={backgroundColor}
    fontSize={fontSize}

    textAlignment='center'
    borderRadius={100}
    minWidth={0}
/>

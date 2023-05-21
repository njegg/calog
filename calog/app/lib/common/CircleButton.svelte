<script lang='ts'>
  export let backgroundColor: string = "#1f1d2e";
  export let color: string = "#908caa";
  export let text: string;
  export let width: number = 30;
  export let height: number = 30;
</script>

<button
  on:tap
  width={width}
  height={height}
  backgroundColor={backgroundColor}
  text={text}
  color={color}

  textAlignment='center'
  borderRadius={100}
  minWidth={0}
/>


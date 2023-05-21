<script lang='ts'>
  export let backgroundColor: string = '#26233a';
  export let color: string = '#e0def4'
  export let text: string;
  export let width: number | undefined = undefined;
  export let height: number | undefined = undefined;
</script>

<button
  on:tap
  width={width}
  height={height}
  backgroundColor={backgroundColor}

  text={text}
  color={color}

  fontSize={20}
  borderRadius={20}
  padding={10}
  textAlignment='center'
  minWidth={0}
/>


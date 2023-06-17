<script lang='ts'>
  export let backgroundColor: string = "#1f1d2e";
  export let color: string = "#908caa";
  export let text: string = '';
  export let width: number | 'auto' = 'auto';
  export let height: number | 'auto' = 'auto';
  export let flexGrow: number = 0;
  export let borderRadius: 0;
  export let fontSize: 20;
</script>

<button 
  on:tap
  width={width}
  height={height}
  backgroundColor={backgroundColor}
  text={text}
  color={color}
  borderRadius={borderRadius}
  flexGrow={flexGrow}
  fontSize={fontSize}

  textAlignment='center'
  minWidth={0}
  minHeight={0}
/>

<script lang='ts'>
  export let backgroundColor: string;
  export let text: string;
</script>

<label
  on:tap
  text={text}
  backgroundColor={backgroundColor}

  width={40}
  height={40}
  textAlignment='center'
  borderRadius='100'
  marginLeft={15}
/>


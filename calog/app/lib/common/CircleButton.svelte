<script lang='ts'>
  export let backgroundColor: string;
  export let text: string;
</script>

<label
  on:tap
  text={text}
  backgroundColor={backgroundColor}

  width={29}
  height={20}
  textAlignment='center'
  borderRadius='100'
  marginLeft={15}
/>


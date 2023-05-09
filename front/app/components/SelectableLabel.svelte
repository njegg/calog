<script lang='ts'> 
  export let selected: boolean;
  export let alt: string;
  export let text: string;
</script>


<label
  on:tap
  text={text == '' ? alt : text}
  borderColor={selected ? '#6e6a86' : '#ebbcba' }
/>

<style>
  label {
    border-width: 1;
    width: 100;
    text-align: center;
    border-width: 2;
    border-radius: 20;
    padding: 10, 20;
    font-size: 25;
  }
</style>

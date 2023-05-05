<script lang='ts'>
  import { TextField } from "tns-core-modules";

  export let next: () => any;
  export let prev: () => any;
  export let input: string;
  export let textField: TextField;
</script>

<flexboxLayout
    backgroundColor='#21202e'

    minHeight={60}
    height={60}
    
    borderRadius={100}
    margin={10}
    padding={10}
>
  <label
    on:tap={prev}

    width={40}
    height={40}
    text='❮'
    textAlignment='center'
    color='#6e6a86'
    borderRadius={100}
    backgroundColor='#403d52'
  />

  <!-- TODO: use SearchField ? -->
  <textField
    bind:this={textField}
    bind:text={input}

    id="search-input"
    flexGrow={1}

    on:textChange
    on:returnPress

    editable='true'
    returnKeyType='next'
    bind:keyboardType

    textAlignment='center'
    fontFamily='monospace'
    fontSize='20rem'
    borderWidth='0'
  />

  <label
    on:tap={next}

    width={40}
    height={40}
    text='❯'
    textAlignment='center'
    borderRadius={100}
    backgroundColor='#403d52'
    color='#6e6a86'
  />
</flexboxLayout>



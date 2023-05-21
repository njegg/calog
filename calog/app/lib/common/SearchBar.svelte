<script lang='ts'>
import NavigationBar from "./NavigationBar.svelte";

export let next: () => void;
export let prev: () => void;
export let text: string;

let textField: any;

</script>

<NavigationBar
  next={next}
  prev={prev}
>
  <textField
    bind:this={textField}
    bind:text
    flexGrow={1}

    on:textChange
    on:returnPress

    editable='true'
    returnKeyType='next'

    textAlignment='center'
    fontFamily='monospace'
    fontSize='20rem'
    borderWidth='0'
  />
</NavigationBar>


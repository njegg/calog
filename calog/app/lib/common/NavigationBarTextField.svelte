<script lang='ts'>
import { onMount } from "svelte";
import { KeyboardType } from "~/../types/keyboardType";

export let text: string = '';
export let keyboardType: KeyboardType;

let textField: any;

// onMount(() => updateText(text));

export function updateText(newText: string) {
  textField.nativeView.text = newText;
  textField.nativeView.setSelection(newText.length);
  focus();
}

export function focus() {
  setTimeout(() => textField.nativeElement.focus(), 0);
}

</script>

<textField
  bind:this={textField}
  bind:text

  id="search-input"
  flexGrow={1}

  on:returnPress
  on:textChange

  editable='true'
  returnKeyType='next'
  bind:keyboardType

  textAlignment='center'
  fontFamily='monospace'
  fontSize='20rem'
  borderWidth='0'
/>


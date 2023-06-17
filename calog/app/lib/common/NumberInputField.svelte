<script lang='ts'>
import { ReturnKeyType } from "~/../types/keyboardType";

export let returnKeyType: ReturnKeyType = 'next'
export let text: string = '';

let field: any;

export function focus() {
  setTimeout(() => field.nativeElement.focus(), 0);
}

export function value(): number {
  return +text;
}

</script>

<textField
  bind:this={field}
  bind:text

  borderColor='#ebbcba'
  keyboardType='integer'
  returnKeyType={returnKeyType}

  borderWidth={1}
  borderRadius={10}
  width={100}
  fontSize={20}
  padding={10}
  textAlignment='center'

  on:returnPress
/>

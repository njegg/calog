<script lang='ts'>
    import CircleButton from "./CircleButton.svelte";

  export let next: () => void;
  export let prev: () => void;
</script>

<flexboxLayout
    backgroundColor='#21202e'

    minHeight={60}
    height={60}
    borderRadius={100}
    margin={10}
    padding='5 3'
>
  <CircleButton
    on:tap={prev}

    text='❮'
    backgroundColor='#403d52'
    color='#6e6a86'

    width={40}
    height={40}
    fontSize={20}
  />

  <slot />

  <CircleButton
    on:tap={next}

    text='❯'
    backgroundColor='#403d52'
    color='#6e6a86'

    width={40}
    height={40}
    fontSize={20}
  />
</flexboxLayout>


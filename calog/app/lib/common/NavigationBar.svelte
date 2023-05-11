<script lang='ts'>
  export let next: () => void;
  export let prev: () => void;
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

    text='❮'
    textAlignment='center'
    color='#6e6a86'
    backgroundColor='#403d52'

    width={40}
    height={40}
    borderRadius={100}
  />

  <slot />

  <label
    on:tap={next}

    text='❯'
    textAlignment='center'
    backgroundColor='#403d52'
    color='#6e6a86'

    width={40}
    height={40}
    borderRadius={100}
  />
</flexboxLayout>


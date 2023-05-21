<script lang='ts'>
  export let margin: string | number = 8;
</script>

<flexboxLayout
    backgroundColor='#26233a'
    color='#e0def4'
    borderRadius={20}
    padding={10}
    margin={margin}
    flexWrap='wrap'
>
  <slot />
</flexboxLayout>

<style>
  flexboxLayout {
    width: 100%;
  }
</style>


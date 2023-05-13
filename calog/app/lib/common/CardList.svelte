<script lang='ts'>
  export let cards: Exercise[];
</script>

<listView
  items={exercises}
  borderColor='#000'
  separatorColor='rgb(0,0,0,0)'
>
  <Template let:item>
    <ExerciseCard exercise={item} on:tap/>
  </Template>
</listView>


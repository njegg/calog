<script lang='ts'>
  import { ObservableArray } from "@nativescript/core";
  import { Template } from "svelte-native/components";
  import { Exercise } from '~/persistance/model/exercise'
  import ExerciseCard from "./ExerciseCard.svelte";

  export let cards: ObservableArray<Exercise>;
</script>

<listView
  row='1'
  items={cards}
  borderColor='#000'
  separatorColor='rgb(0,0,0,0)'
>
  <Template let:item>
    <ExerciseCard exercise={item} on:tap/>
  </Template>
</listView>


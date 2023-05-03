<script lang='ts'>
    import { ItemEventData, ObservableArray } from "@nativescript/core";
  import { Template } from "svelte-native/components";
  import { Card } from "~/exercise";
  import ExerciseCard from "./ExerciseCard.svelte";

  export let cards: ObservableArray<Card>;

  console.log(">>>>>>>>>>>>>>>> cards: " + cards);

  function itemTap(itemEventData: ItemEventData) {
    let index = itemEventData.index;
    
    let tapped = cards.getItem(index);
    tapped.selected = !tapped.selected;
    cards.setItem(index, tapped);
  }
</script>

<listView
  row='1'
  on:itemTap={itemTap}
  items={cards}
>
  <Template let:item>
    <ExerciseCard card={item} /> 
  </Template>
</listView>



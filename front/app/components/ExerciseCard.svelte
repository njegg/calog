
<script lang='ts'>
  import { Card } from "~/exercise";
  
  export let card: Card;
</script>

<stackLayout>

  <flexboxLayout
  >

    <label
      text={card.exercise.name}
      textWrap='true'
    />

    {#if card.selected }
      <button>+</button>
      <button>?</button>
    {/if}
  </flexboxLayout>

  {#if card.selected }

    <flexboxLayout >
      <textField
        width='50'
        editable='true'
      />

      <label text='X'/>

      <textField
        width='50'
        editable='true'
      />
    </flexboxLayout>

    <flexboxLayout >
      <label text='sets'/>
      <label text=''/>
      <label text='reps'/>

    </flexboxLayout>
    
  {/if}

</stackLayout>

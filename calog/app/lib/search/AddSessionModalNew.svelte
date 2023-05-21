<script lang='ts'>

import { Exercise } from '~/persistance/model/exercise'
import { Command } from '../command/command';

export let command: Command;
export let exercise: Exercise;

</script>


<stackLayout
  backgroundColor='#26233a'
  borderRadius={20}
  padding={20}
>
  <label
    color='#ebbcba'
    textAlignment='center'
    fontSize={20}
    text={exercise.name}
    marginBottom={20}
  />

  <flexboxLayout>
    <textField
      borderColor='#ebbcba'
      borderWidth={1}
      width={30}
    />

    <label
      text='✕'
      fontSize={30}
      textAlignment='center'
      flexGrow={1}
    />

    <textField
      borderColor='#ebbcba'
      borderWidth={1}
      width={30}

      on:returnPress={() => console.log('modal return')}
    />
  </flexboxLayout>

</stackLayout>


<script lang='ts'>
  import { Exercise } from '~/persistance/model/exercise'
  import { ThemeColors, themeStore } from '../common/theme';

  export let exercise: Exercise;

  let theme: ThemeColors;
  themeStore.subscribe(t => theme = t);
</script>


<stackLayout
  backgroundColor={theme.baseLight}
  borderRadius={20}
  margin={10}
  padding={20}
>
  <label
    color={theme.rose}
    textAlignment='center'
    fontSize={20}
    text={exercise.name}
    marginBottom={20}
  />

</stackLayout>


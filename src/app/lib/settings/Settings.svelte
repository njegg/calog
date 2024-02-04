<script lang='ts'>
  import { ExerciseRepo, SessionRepo } from "~/persistance/db";
  import { writeToPickedFile, pickAndImportUserData } from "../util/file_access";
  import Card from "../common/Card.svelte";
  import { generate } from "~/persistance/test/test_data_generation";
  import { Theme, themeStore, updateTheme } from "../common/theme";
  import { UserData } from "../util/user_data";

  let theme: Theme;
  themeStore.subscribe(t => theme = t.type);

  function backupData(): void {
    let userData: UserData = {
      theme,
      sessions: SessionRepo.allCompact(),
    };

    writeToPickedFile(`calog_data-${new Date().toISOString()}.json`, userData);
  }

  function readDataFromJsonFile(): void {
    pickAndImportUserData();
  }

  function generateTestData(): void {
    let monthInMs = 1000 * 60 * 60 * 24 * 30;

    let today = new Date();
    let start = new Date();
    start.setTime(today.getTime() - monthInMs);

    let generatedData = generate(start, today, 2, ExerciseRepo.all()[0]);

    let added = generatedData.map(s => SessionRepo.add(s));

    if (!added.every(e => e)) {
      console.error('Something went wrong:');
      console.error(generatedData.filter((_, i) => !added[i]));
    }
  }

  function removeTestData(): void {
    SessionRepo.destroy();
  }

  function testButton() {
    console.log('test butt');
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <Card margin='8 0'>
    <label text='Export Data' on:tap={backupData} />
  </Card>

  <Card margin='8 0'>
    <label text='Import Data' on:tap={readDataFromJsonFile} />
  </Card>

  <Card margin='8 0'>
    <label text='Generate test data' on:tap={generateTestData} />
  </Card>

  <Card margin='8 0'>
    <label text='Remove all data' on:tap={removeTestData} />
  </Card>

  <Card margin='8 0'>
    <label text='Test Button' on:tap={testButton} />
  </Card>

  <Card margin='8 0'>
    <label text={Theme.getName(Theme.ROSE_PINE_DARK)} on:tap={() => updateTheme(Theme.ROSE_PINE_DARK)} />
  </Card>

  <Card margin='8 0'>
    <label text={Theme.getName(Theme.ROSE_PINE_LIGHT)} on:tap={() => updateTheme(Theme.ROSE_PINE_LIGHT)} />
  </Card>

</flexboxLayout>

<style>
  label {
    flex-grow: 1;
    text-align: center;
  }
</style>

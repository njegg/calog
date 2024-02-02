<script lang='ts'>
  import { ExerciseRepo, SessionRepo } from "~/persistance/db";
  import { writeToPickedFile } from "../util/file_access";
  import Card from "../common/Card.svelte";
  import { generate } from "~/persistance/test/test_data_generation";

  function backupSessions(): void {
    writeToPickedFile('calog_sessions_data.json', SessionRepo.all());
  }

  function generateTestData(): void {
    let start = new Date('2023/04/13');
    let end = new Date();

    let generatedData = generate(start, end, 2, ExerciseRepo.all()[0]);

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
    console.log('ouh'); 
  }
</script>

<flexboxLayout
  justifyContent='flex-end'
  flexDirection='column'
>
  <Card margin='8 0'>
    <label text='Export Sessions' on:tap={backupSessions} />
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

</flexboxLayout>

<style>
  label {
    flex-grow: 1;
    text-align: center;
  }
</style>

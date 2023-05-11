<script lang='ts'>
  import { SessionRepo } from "~/persistance/db";
  import { writeToPickedFile } from "../util/file_access";

  function backupSessions() {
    writeToPickedFile('calog_sessions_data.json', SessionRepo.all());
  }
</script>

<button 
  on:tap={backupSessions}
  text='Backup Sessions'
/>

<style>

</style>

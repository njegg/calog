<script lang='ts'>
  import { writeToPickedFile } from "../util/file_access";

  function backupSessions() {
    writeToPickedFile('calog_sessions_data.json', { test: 'data' });
  }
</script>

<button 
  on:tap={backupSessions}
  text='Backup Sessions'
/>

<style>

</style>

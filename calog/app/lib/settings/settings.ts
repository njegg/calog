import { ExerciseRepo, SessionRepo } from '~/persistance/db' 
import { generate } from '~/persistance/test/test_data_generation';
import { Command } from '../command/command';
import { writeToPickedFile } from '../util/file_access';

export const settingsCommands: Command[] = [
   {
     name: 'Remove Test Data', 
     exec: () => { SessionRepo.destroy(); },
     undo: undefined
   },

   {
     name: 'Export Sessions',
     exec: () => {
       writeToPickedFile('calog_sessions_data.json', SessionRepo.all());
     },
     undo: undefined
   },

   {
     name: 'Generate Test Data',
     exec: () => {
       let start = new Date('2023/04/13');
       let end = new Date();

       let generatedData = generate(start, end, 2, ExerciseRepo.all()[0]);

       let added = generatedData.map(s => SessionRepo.add(s));

       if (!added.every(e => e)) {
         console.error('Something went wrong:');
         console.error(generatedData.filter((_, i) => !added[i]));
       }
     },
     undo: undefined
   },

   {
     name: 'Test Button',
     exec: () => { console.log('yeet'); },
     undo: undefined
   },
]


import { Routes } from '@angular/router';
import { NoteListComponent } from './features/note-list/note-list.component';

export const routes: Routes = [
    {path: 'note-list', component: NoteListComponent},
    {path: '', redirectTo: 'note-list', pathMatch: 'full'}
];

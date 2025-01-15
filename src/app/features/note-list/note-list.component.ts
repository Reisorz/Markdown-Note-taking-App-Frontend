import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/service/note.service';
import { NoteEntity } from '../../core/model/note-entity';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {

  notes: NoteEntity[] = [];
  selectedNote: NoteEntity = new NoteEntity;

  constructor(private router: Router, private noteService: NoteService){

    this.loadNoteList();
  }

  loadNoteList() {
    this.noteService.listNotes().subscribe({
      next: (data) => {this.notes = data,
        console.log(this.notes)
    },
        error: (error:any) => console.log(error)
    })
  }

  loadNote(id: number){
    this.noteService.getNoteById(id).subscribe({
      next: (data) => {this.selectedNote = data,
        console.log(this.selectedNote)
    },
        error: (error:any) => console.log(error)
    })
  }

}

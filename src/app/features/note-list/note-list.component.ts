import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/service/note.service';
import { NoteEntity } from '../../core/model/note-entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteRequest } from '../../core/model/note-request';

@Component({
  selector: 'app-note-list',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './note-list.component.html',
  styleUrl: './note-list.component.css'
})
export class NoteListComponent {

  notes: NoteEntity[] = [];
  selectedNote: NoteEntity = new NoteEntity;
  noteResquest: NoteRequest = new NoteRequest;

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

  createNote() {
    this.noteResquest.title = "New note";
    this.noteResquest.markdownContent = "";
    this.noteService.createNote(this.noteResquest).subscribe({
      next: (data) => {this.loadNoteList()
    },
        error: (error:any) => console.log(error)
    })
  }

}

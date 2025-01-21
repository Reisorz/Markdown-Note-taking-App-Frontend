import { Component, NgModule } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NoteService } from '../../core/service/note.service';
import { NoteEntity } from '../../core/model/note-entity';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NoteRequest } from '../../core/model/note-request';
import { error } from 'node:console';

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
  uploadedFile: File;

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
      next: (data) => {this.loadNoteList(),
        this.selectedNote = data;
    },
        error: (error:any) => console.log(error)
    })
  }

  updateNote() {
    this.noteService.updateNote(this.selectedNote).subscribe({
      next: (data) => {this.selectedNote = data,
        this.loadNoteList();
        console.log(this.selectedNote)
    },
        error: (error:any) => console.log(error)
    })
  }

  uploadFile(event: Event){

    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      this.uploadedFile = input.files[0];
      console.log('File selected:', this.uploadedFile.name);
    }

    this.noteService.uploadNote(this.uploadedFile).subscribe({
      next: (data) => {this.loadNoteList(),
        this.selectedNote = data
      },
      error: (error:any) => console.log(error)
    })
  }

}

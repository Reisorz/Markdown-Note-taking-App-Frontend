import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteEntity } from '../model/note-entity';
import { NoteRequest } from '../model/note-request';

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  private urlBase = 'http://localhost:8080/note';

  constructor(private http: HttpClient) { }

  listNotes(){
    return this.http.get<NoteEntity[]>(`${this.urlBase}/list-all-notes`);
  }

  getNoteById(id: number){
    return this.http.get<NoteEntity>(`${this.urlBase}/get-note-by-id/${id}`);
  }

  createNote(noteRequest: NoteRequest) {
    return this.http.post<NoteEntity>(`${this.urlBase}/create-note`, noteRequest);
  }

  updateNote(noteEntity: NoteEntity) {
    return this.http.put<NoteEntity>(`${this.urlBase}/update-note`, noteEntity);
  }

  uploadNote(uploadedFile: File) {
    const formData = new FormData();
    formData.append('file', uploadedFile, uploadedFile.name);
    return this.http.post<NoteEntity>(`${this.urlBase}/upload-note`, formData);
  }

  deleteNote(id: number) {
    return this.http.delete(`${this.urlBase}/delete-note/${id}`)
  }


}

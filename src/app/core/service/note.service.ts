import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NoteEntity } from '../model/note-entity';

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
    return this.http.get<NoteEntity>(`${this.urlBase}/get-note-by-id/${id}`)
  }
}

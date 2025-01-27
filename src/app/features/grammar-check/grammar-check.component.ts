import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Route, Router, RouterModule } from '@angular/router';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { NoteService } from '../../core/service/note.service';
import { NoteEntity } from '../../core/model/note-entity';
import { GrammarCheckService } from '../../core/service/grammar-check.service';
import { GrammarRequest } from '../../core/model/grammar-request';
import { MarkdownModule, MarkdownService } from 'ngx-markdown';
import { not } from 'rxjs/internal/util/not';
import { notEqual } from 'assert';
import { GrammarResponse } from '../../core/model/grammar-response';

@Component({
  selector: 'app-grammar-check',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule, ToastrModule, MarkdownModule],
  templateUrl: './grammar-check.component.html',
  styleUrl: './grammar-check.component.css'
})
export class GrammarCheckComponent {

  noteId: number;
  note: NoteEntity = new NoteEntity;
  grammarRequest: GrammarRequest = new GrammarRequest;
  grammarResponse: GrammarResponse[] = [];
  

  constructor(private router: Router, private route: ActivatedRoute, private toastr: ToastrService,
     private noteService: NoteService, private grammarService: GrammarCheckService, private mdService: MarkdownService){}

  ngOnInit(){
    this.noteId = this.route.snapshot.params['id'];
    this.noteService.getNoteById(this.noteId).subscribe({
      next: (data) => {this.note = data;
        this.checkGrammar();  
      },
      error: (error: any) => console.log(error)
    })
  }

  checkGrammar(){
    this.grammarResponse = [];
    this.grammarRequest.text = this.note.markdownContent;
    this.grammarRequest.language = "en-US";
    this.grammarService.checkGrammar(this.grammarRequest).subscribe({
      next: (data: any) => { data.forEach((grammarMatch: GrammarResponse) => {
        this.grammarResponse.push(grammarMatch);
      });
        console.log(this.grammarResponse);
      },
      error: (error:any) => console.log(error)
    })
  }

  updateNote() {
    this.noteService.updateNote(this.note).subscribe({
      next: (data) => {this.note = data;
        console.log(this.note);
        this.router.navigate(["/note-list"]);
        this.toastr.success("Your note has been updated succesfully.", "Note updated!");
    },
        error: (error:any) => {console.log(error);
        }
    })
  }



}

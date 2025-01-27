import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GrammarRequest } from '../model/grammar-request';
import { GrammarResponse } from '../model/grammar-response';

@Injectable({
  providedIn: 'root'
})
export class GrammarCheckService {

  private urlBase = 'http://localhost:8080/grammar';
  
  constructor(private http: HttpClient) { }
  
  checkGrammar(request: GrammarRequest) {
    return this.http.post(`${this.urlBase}/check-grammar`, request)
  }
}

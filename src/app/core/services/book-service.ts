import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book, updateRequest } from '../models/book.Interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private backendApi = import.meta.env['NG_APP_BACKEND_URL'];

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    const params = { q: query };
    return this.http.get(`${this.backendApi}/api/searchBooks`, { params });
  }

  addBook(book: book) {
    return this.http.post(`${this.backendApi}/api/addBook`, book);
  }

  getUserList(filter:string) {
    const params = {status:filter}
    return this.http.get(`${this.backendApi}/api/getAllBooks`,{params});
  }

  updateBook(data: updateRequest, id: number) {
    return this.http.post(`${this.backendApi}/api/book/${id}`, data);
  }

  deleteBook(id:number){
    return this.http.post(`${this.backendApi}/api/deleteBook/${id}`,{});
  }
}

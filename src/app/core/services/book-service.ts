import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { book } from '../models/book.Interface';

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://www.googleapis.com/books/v1/volumes';
  private backendApi = 'http://localhost:8080';
  private apiKey = import.meta.env['NG_APP_API_KEY'];

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<any> {
    const params = {
      q: query,
      maxResults: '40',
      key: this.apiKey,
    };

    return this.http.get(this.apiUrl, { params, withCredentials: false });
  }

  addBook(book: book) {
    console.log(book);
    return this.http.post(`${this.backendApi}/addBook`,book);
  }
}

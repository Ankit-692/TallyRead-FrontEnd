import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../../../../services/book-service';
import { FormsModule } from '@angular/forms';
import { book } from '../../../../models/book.Interface';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [FormsModule, CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  books: book[] = [];
  selectedBook: book | null = null;
  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
  ) {}

  openModal(b: book) {
    this.selectedBook = b;
  }

  closeModal() {
    this.selectedBook = null;
  }

  searchBook(userInput: string) {
    if (!userInput) return;
    this.bookService.searchBooks(userInput).subscribe((data: any) => {
      this.books = data.items.map((item: any) => {
        const info = item.volumeInfo;
        console.log(info.averageRating);
        return {
          title: info.title || 'No Title',
          description: info.description || 'No description available.',
          authors: info.authors ? info.authors.join(', ') : 'Unknown Author',
          totalPage: info.pageCount || 0,
          ratings: info.averageRating || 'N/A',
          image: info.imageLinks?.thumbnail || 'assets/noCover.png',
          publishedDate: info.publishedDate || 'Unknown',
        } as book;
      });
      this.cdr.detectChanges();
    });
  }

  addToLibrary(b: book) {
    return this.bookService.addBook(b).subscribe({
      next:(res)=>{
        console.log("added")
      },
      error:(err)=>{
        console.log(err)
      }
    });
  }
}

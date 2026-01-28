import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../../../../services/book-service';
import { FormsModule } from '@angular/forms';
import { book } from '../../../../models/book.Interface';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification-service';

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
    private notify: NotificationService,
  ) {}

  openModal(b: book) {
    this.selectedBook = b;
  }

  closeModal() {
    this.selectedBook = null;
  }

  searchBook(userInput: string) {
    if (!userInput) return;
    this.bookService.searchBooks(userInput).subscribe({
      next: (data:book[]) => {
        this.books = data ;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.notify.show("Somthing Went Wrong! Try Again","error")
      },
    });
  }

  addToLibrary(b: book) {
    b.state = 'planning';
    b.ratings = String(b.ratings);
    console.log(typeof b.ratings);
    return this.bookService.addBook(b).subscribe({
      next: (res) => {
        this.closeModal();
        this.notify.show('Book Added Successfully ! ', 'success');
        this.cdr.detectChanges();
        console.log('added');
      },
      error: (err: any) => {
        if (err.status == 409) {
          this.closeModal();
          this.notify.show('Book Already Exists', 'info');
          this.cdr.detectChanges();
        } else {
          this.notify.show('Something Went Wrong!', 'error');
          this.cdr.detectChanges();
        }
        console.log(err);
      },
    });
  }
}

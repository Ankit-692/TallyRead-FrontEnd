import { ChangeDetectorRef, Component } from '@angular/core';
import { BookService } from '../../../../services/book-service';
import { book } from '../../../../models/book.Interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './user-list.html',
  styleUrl: './user-list.scss',
})
export class UserList {
  books: book[] = [];
  states = ['planning', 'reading', 'completed', 'dropped'];
  selectedBook: book | null = null;
  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
  ) {}

  ngOnInit(): void {
    this.bookService.getUserList().subscribe((data: any) => {
      const items = data?.books || [];
      this.books = items.map((info: any) => {
        console.log(info);
        return {
          title: info.Title,
          description: info.Description,
          authors: info.Authors,
          totalPage: info.TotalPage,
          ratings: info.Ratings,
          image: info.Image,
          publishedDate: info.PublishedDate,
          pageRead: info.PageRead,
          state: info.State,
        } as book;
      });
      console.log(this.books);
      this.cdr.detectChanges();
    });
  }

  openModal(b: book) {
    this.selectedBook = b;
  }

  closeModal() {
    this.selectedBook = null;
  }

  update(b:book){

  }
}

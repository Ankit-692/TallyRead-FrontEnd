import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { BookService } from '../../../../services/book-service';
import { book, updateRequest } from '../../../../models/book.Interface';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../../../services/notification-service';

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
  showDropdown: boolean = false;
  filter: string = 'all';

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
    private notify: NotificationService
  ) {}

  ngOnInit(): void {
    this.getUserList(this.filter);
  }

  getUserList(value: string) {
    this.filter = value;
    this.bookService.getUserList(value).subscribe({
      next: (data: any) => {
        const items = data?.books || [];
        this.books = items.map((info: any) => {
          console.log(info)
          return {
            id: info.ID,
            title: info.title,
            description: info.description,
            authors: info.authors,
            totalPage: info.totalPage,
            ratings: info.ratings,
            image: info.image,
            publishedDate: info.publishedDate,
            pageRead: info.PageRead,
            state: info.State,
          } as book;
        });
      },
      error: (err) => {
        console.log(err);
        this.notify.show("something went Wrong!","error");
      },
    });
    this.cdr.detectChanges();
  }

  openModal(b: book) {
    this.selectedBook = b;
  }

  closeModal() {
    if (this.selectedBook != null && this.selectedBook.pageRead > this.selectedBook.totalPage) {
      return;
    }
    this.selectedBook = null;
  }

  update(b: book) {
    const updateRequest: updateRequest = {
      pageRead: b.pageRead,
      state: b.state,
    };
    this.bookService.updateBook(updateRequest, b.id).subscribe({
      next: (res) => {
        this.getUserList(this.filter);
        this.closeModal();
        this.notify.show("Book Updated","success")
        console.log(res);
      },
      error: (err) => {
        this.notify.show("Something went wrong","error")
        console.log(err);
      },
    });
  }

  delete(b: book) {
    this.bookService.deleteBook(b.id).subscribe({
      next: (res) => {
        this.getUserList(this.filter);
        this.closeModal();
        this.notify.show("Book Deleted","success")
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.notify.show("Something Went Wrong","error")
      },
    });
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.custom-dropdown')) {
      this.showDropdown = false;
    }
  }
}

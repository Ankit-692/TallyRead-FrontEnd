import { ChangeDetectorRef, Component, HostListener } from '@angular/core';
import { BookService } from '../../../../services/book-service';
import { book, updateRequest } from '../../../../models/book.Interface';
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
  showDropdown: boolean = false;
  filter: string = 'all'
  updateMessage: string = "";

  constructor(
    private bookService: BookService,
    private cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    this.getUserList(this.filter)
  }

  showUpdateMsg(msg: string) {
    this.updateMessage = msg;
    setTimeout(() => {
      this.updateMessage = '';
      this.cdr.detectChanges();
    }, 3000)
  }

  getUserList(value: string) {
    this.filter = value
    this.bookService.getUserList(value).subscribe((data: any) => {
      const items = data?.books || [];
      this.books = items.map((info: any) => {
        console.log(info);
        return {
          id: info.ID,
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
    if (this.selectedBook != null && this.selectedBook.pageRead > this.selectedBook.totalPage) {
      console.warn('Please fix the page count before closing.');
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
        this.getUserList(this.filter)
        this.closeModal();
        this.showUpdateMsg("Status Updated !")
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  delete(b: book) {
    this.bookService.deleteBook(b.id).subscribe({
      next: (res) => {
        this.getUserList(this.filter)
        this.closeModal();
        this.showUpdateMsg("Book Deleted");
        console.log(res);
      },
      error: (err) => {
        console.log(err);
        this.showUpdateMsg("something went Wrong!")
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

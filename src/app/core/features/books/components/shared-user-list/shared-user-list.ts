import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../../../../services/book-service';
import { book } from '../../../../models/book.Interface';
import { NotificationService } from '../../../../services/notification-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shared-user-list',
  imports: [FormsModule, CommonModule],
  templateUrl: './shared-user-list.html',
  styleUrl: './shared-user-list.scss',
})
export class SharedUserList {
  books: book[] = [];
  userId: string = '';
  selectedBook: book | null = null;
  userName: string = '';

  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private notify: NotificationService,
  ) {}

  ngOnInit(): void {
    this.userId = this.route.snapshot.paramMap.get('userId')!;
    this.bookService.getSharedUserBooks(this.userId).subscribe({
      next: (data: any) => {
        this.userName = data?.userName || '';
        const items = data?.books || [];
        this.books = items.map((info: any) => {
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
        this.notify.show('something went Wrong!', 'error');
      },
    });
  }

  openModal(b: book) {
    this.selectedBook = b;
  }

  closeModal() {
    this.selectedBook = null;
  }
}

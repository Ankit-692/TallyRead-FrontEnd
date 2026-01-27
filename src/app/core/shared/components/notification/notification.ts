import { Component, inject } from '@angular/core';
import { NotificationService } from '../../../services/notification-service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  imports: [FormsModule,CommonModule],
  templateUrl: './notification.html',
  styleUrl: './notification.scss',
})
export class Notification {
  private notificationService = inject(NotificationService);
  notification$ = this.notificationService.message$;
}

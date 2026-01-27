import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
 private messageSource = new Subject<{msg: string, type: string} | null>();
  message$ = this.messageSource.asObservable();

  show(msg: string, type: 'success' | 'error' | 'info' = 'info') {
    this.messageSource.next({ msg, type });
    
    setTimeout(() => {
      this.messageSource.next(null);
    }, 3000);
  } 
}

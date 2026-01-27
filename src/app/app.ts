import { Component, inject } from '@angular/core';
import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterOutlet } from '@angular/router';
import { Navbar } from './core/shared/components/navbar/navbar';
import { LoadingService } from './core/services/loading-service';
import { CommonModule } from '@angular/common';
import { Notification } from './core/shared/components/notification/notification';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Navbar, CommonModule, Notification],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  public loadingService = inject(LoadingService);
  private router = inject(Router);

  constructor() {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationStart) {
        this.loadingService.show();
      } else if (
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError
      ) {
        setTimeout(() => this.loadingService.hide(), 200);
      }
    });
  }
}
import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { ForgetPasswordRequest, LoginRequest, ResetRequest, User } from '../models/user.Interface';
import { catchError, map, of, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = import.meta.env['NG_APP_BACKEND_URL'];
  currentUser = signal<any>(null);

  constructor(private http: HttpClient) { }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }

  logout() {
    return this.http.post(`${this.apiUrl}/api/logout`, {}).pipe(
      tap(() => {
        this.currentUser.set(null);
      })
    );
  }

  checkAuthStatus(): Observable<boolean> {
    return this.http.get<any>(`${this.apiUrl}/api/me`).pipe(
      map((res) => {
        this.currentUser.set({ username: res.username, authenticated: res.authenticated });
        return true;
      }),
      catchError(() => {
        this.currentUser.set(null);
        return of(false);
      })
    );
  }

  requestResetLink(email: ForgetPasswordRequest) {
    return this.http.post(`${this.apiUrl}/forgot-Password`, email)
  }

  resetPassword(token: string | null, data: ResetRequest) {
    if (token == null) {
      return
    }
    return this.http.post(`${this.apiUrl}/reset-password?token=${token}`, data)
  }
}

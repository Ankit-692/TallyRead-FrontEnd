import { HttpClient } from '@angular/common/http';
import { Injectable,signal } from '@angular/core';
import { LoginRequest, User } from '../models/user.Interface';
import { catchError, map, of, Observable, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:8080';
  currentUser = signal<any>(null);

  constructor(private http: HttpClient) {}

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, loginRequest);
  }

  logout(){
    return this.http.post(`${this.apiUrl}/logout`,{}).pipe(
      tap(()=>{
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
}

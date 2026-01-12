import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, User } from '../models/user.Interface';
import { TokenStorageService } from './token-storage-service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = "http://localhost:8080";


  constructor(
    private http: HttpClient,
    private tokenservice: TokenStorageService
  ) { }

  register(user: User) {
    return this.http.post(`${this.apiUrl}/register`, user)
  }

  login(loginRequest: LoginRequest) {
    return this.http.post(`${this.apiUrl}/login`, loginRequest)
  }

  logout() {
    this.tokenservice.deleteToken()
  }

  hasToken(): boolean {
    return !!this.tokenservice.getToken()
  }

}

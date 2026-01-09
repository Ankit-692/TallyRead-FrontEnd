import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  save(token: string) {
    localStorage.setItem('jwt_token', token);
  }

  getToken() {
    return localStorage.getItem('jwt_token');
  }

  deleteToken() {
    localStorage.removeItem('jwt_token');
  }
}

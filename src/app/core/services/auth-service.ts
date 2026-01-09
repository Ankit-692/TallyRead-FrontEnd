import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest, User } from '../models/user.Interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private apiUrl = "http://localhost:8080";


constructor(
  private http:HttpClient
) {}

register(user:User){
  return this.http.post(`${this.apiUrl}/register`,user) 
}

login(loginRequest:LoginRequest){
  return this.http.post(`${this.apiUrl}/login`,loginRequest)
}


}

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { LoginResponse } from '../models/login-response';
import {Login} from '../models/login';
import {tap} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(data:Login){
    return this.http.post<LoginResponse>(`${environment.apiUrl}/auth/login`, data) .pipe(

            tap(response => {

                this.storeSession(response);

            })

        );
  }

  storeSession(response: LoginResponse): void {       //storing token and user info in local storage

  localStorage.setItem('token', response.token);

  localStorage.setItem('userId', response.userId);

  localStorage.setItem('username', response.username);

  localStorage.setItem('role', response.role);

  localStorage.setItem(
    'isSystem',
    response.isSystem.toString()
  );

}
getUserId(): string | null {

  return localStorage.getItem('userId');

}

getUsername(): string | null {

  return localStorage.getItem('username');

}

getRole(): string | null {

  return localStorage.getItem('role');

}
isAdmin(): boolean {

  return this.getRole() === 'Administrator';

}

  getToken():string | null {
    return localStorage.getItem('token');
  }

  isTokenValid(): boolean {
    const token = this.getToken();
    if (!token) {
      return false;
    }
    try {
    const payload = JSON.parse(atob(token.split('.')[1]));

    const expiry = payload.exp * 1000;

    return Date.now() < expiry;
  } catch {
    return false;
  }
    
  }

  isLoggedIn(): boolean { 
    return this.isTokenValid();
  }
  
  logout(): void {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('username');
  localStorage.removeItem('role');
  localStorage.removeItem('isSystem');
}
}

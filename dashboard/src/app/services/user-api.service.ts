import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { User } from '../models/user';
import { CreateUserDto } from '../models/createUserDto';

@Injectable({
  providedIn: 'root'
})
export class UserApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/User`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Observable<User[]> {

    return this.http.get<User[]>(this.apiUrl);

  }

  getById(id: string): Observable<User> {

    return this.http.get<User>(
      `${this.apiUrl}/${id}`
    );

  }

  create(dto: CreateUserDto): Observable<User> {

    return this.http.post<User>(
      this.apiUrl,
      dto
    );

  }

  update(user: User): Observable<User> {

    return this.http.put<User>(
      `${this.apiUrl}/${user.id}`,
      {
        username: user.username,
        fullName: user.fullName,
        email: user.email,
        contact: user.contact,
        isActive: user.isActive,
        userTypeId: user.userTypeId
      }
    );

  }

}
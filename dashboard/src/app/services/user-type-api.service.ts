import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

import { UserType } from '../models/user-type';
import { CreateUserTypeDto } from '../models/createUserTypeDto';

@Injectable({
  providedIn: 'root'
})
export class UserTypeApiService {

  private readonly apiUrl =
    `${environment.apiUrl}/Usertype`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getAll(): Observable<UserType[]> {

    return this.http.get<UserType[]>(
      this.apiUrl
    );

  }

  getById(id: string): Observable<UserType> {

    return this.http.get<UserType>(
      `${this.apiUrl}/${id}`
    );

  }

  create(dto: CreateUserTypeDto): Observable<UserType> {

    return this.http.post<UserType>(
      this.apiUrl,
      dto
    );

  }

  update(userType: UserType): Observable<UserType> {

    return this.http.put<UserType>(
      `${this.apiUrl}/${userType.id}`,
      {
        name: userType.name,
        isActive: userType.isActive
      }
    );

  }

}


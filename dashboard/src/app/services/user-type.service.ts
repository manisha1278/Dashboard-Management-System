import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserType } from '../models/user-type';
import { CreateUserTypeDto } from '../models/createUserTypeDto';
import { UserTypeApiService } from './user-type-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserTypeService {

  private readonly userTypesSubject =
    new BehaviorSubject<UserType[]>([]);

  constructor(
    private readonly userTypeApiService: UserTypeApiService
  ) { }

  getUserTypes(): Observable<UserType[]> {

    return this.userTypesSubject.asObservable();

  }

  load(): void {

    this.userTypeApiService
      .getAll()
      .subscribe(userTypes => {

        this.userTypesSubject.next(userTypes);

      });

  }
  getCurrentUserTypes(): UserType[] {//

    return this.userTypesSubject.value;

}

  create(dto: CreateUserTypeDto): void {

    this.userTypeApiService
      .create(dto)
      .subscribe({ next: () => 

        this.load(),
        error: (error) => {

          console.error(error);
      } });

  }

  update(userType: UserType): void {

    this.userTypeApiService
      .update(userType)
      .subscribe({ next: () => 

        this.load(),
        error: (error) => {

          console.error(error);
      } });

  }

  getById(id: string): UserType | undefined {

    return this.userTypesSubject.value.find(x => x.id === id);

  }

  clear(): void {

    this.userTypesSubject.next([]);

  }

}
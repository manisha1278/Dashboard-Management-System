import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserType } from '../../models/user-type';
import { CreateUserTypeDto } from '../../models/createUserTypeDto';
import { UserTypeApiService } from '../api-services/user-type-api.service';

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
  setUserTypes(userTypes: UserType[]): void {

    this.userTypesSubject.next(userTypes);

  }


  getCurrentUserTypes(): UserType[] {//

    return this.userTypesSubject.value;

  }




  getById(id: string): UserType | undefined {

    return this.userTypesSubject.value.find(x => x.id === id);

  }

  clear(): void {

    this.userTypesSubject.next([]);

  }

}
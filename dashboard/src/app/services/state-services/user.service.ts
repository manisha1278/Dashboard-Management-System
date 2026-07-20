import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../../models/user';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersSubject =
    new BehaviorSubject<User[]>([]);



  getUsers(): Observable<User[]> {

    return this.usersSubject.asObservable();

  }
  setUsers(users: User[]): void {

    this.usersSubject.next(users);

  }




  getCurrentUsers(): User[] {

    return this.usersSubject.value;

  }




  getById(id: string): User | undefined {

    return this.usersSubject.value.find(x => x.id === id);

  }

  clear(): void {

    this.usersSubject.next([]);

  }

}
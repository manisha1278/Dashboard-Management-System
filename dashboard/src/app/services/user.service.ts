import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

import { User } from '../models/user';
import { CreateUserDto } from '../models/createUserDto';

import { UserApiService } from './user-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly usersSubject =
    new BehaviorSubject<User[]>([]);

  constructor(
    private readonly userApiService: UserApiService
  ) { }

  getUsers(): Observable<User[]> {

    return this.usersSubject.asObservable();

  }

  load(): void {

    this.userApiService
      .getAll()
      .subscribe(users => {

        this.usersSubject.next(users);

      });

  }

  getCurrentUsers(): User[] {

    return this.usersSubject.value;

  }

  create(dto: CreateUserDto): void {

    this.userApiService
      .create(dto)
      .subscribe({

        next: () => this.load(),

        error: error => console.error(error)

      });

  }

  update(user: User): void {

    this.userApiService
      .update(user)
      .subscribe({

        next: () => {
          const selectedUserId= 
          this.load()},

        error: error => console.error(error)

      });

  }

  getById(id: string): User | undefined {

    return this.usersSubject.value.find(x => x.id === id);

  }

  clear(): void {

    this.usersSubject.next([]);

  }

}
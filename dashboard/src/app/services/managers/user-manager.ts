import { Injectable } from '@angular/core';
import{ CreateUserDto } from '../../models/createUserDto';
import { UserApiService } from '../user-api.service';
import { UserService } from '../user.service';
import{User} from '../../models/user';
import{Observable,tap} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserManager {

  constructor(
    private readonly userApiService: UserApiService,
    private readonly userService: UserService
  ) { }

  load(): void {

    this.userApiService
      .getAll()
      .subscribe({

        next: users => {

          this.userService.setUsers(users);

        },

        error: error => {

          console.error(
            'Error loading users',
            error
          );

        }

      });

  }
   create(dto: CreateUserDto): void {
  
      this.userApiService
        .create(dto)
        .subscribe({
  
          next: () =>{ 
            
            this.load();

           },
  
          error: error =>{ console.error('Error creating user:', error);

           }

          });
  
    }
    update(user: User): Observable<User> {

  return this.userApiService
    .update(user)
    .pipe(

      tap(() => {

        this.load();

      })

    );

}


  }
  



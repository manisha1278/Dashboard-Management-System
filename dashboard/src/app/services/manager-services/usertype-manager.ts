import { Injectable } from '@angular/core';

import { UserTypeApiService } from '../api-services/user-type-api.service';
import { UserTypeService } from '../state-services/user-type.service';
import { CreateUserTypeDto } from '../../models/createUserTypeDto';
import { UserType } from '../../models/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserTypeManager {

  constructor(
    private readonly userTypeApiService: UserTypeApiService,
    private readonly userTypeService: UserTypeService
  ) { }

  load(): void {

    this.userTypeApiService
      .getAll()
      .subscribe({

        next: userTypes => {

          this.userTypeService.setUserTypes(
            userTypes
          );

        },

        error: error => {

          console.error(
            'Error loading user types',
            error
          );

        }

      });

  }
  create(dto: CreateUserTypeDto): void {

    this.userTypeApiService
      .create(dto)
      .subscribe({

        next: () => {

          this.load();

        },

        error: error => {

          console.error(
            'Error creating user type',
            error
          );

        }

      });

  }
  update(userType: UserType): void {

    this.userTypeApiService
      .update(userType)
      .subscribe({

        next: () => {

          this.load();

        },

        error: error => {

          console.error(
            'Error updating user type',
            error
          );

        }

      });

  }

}
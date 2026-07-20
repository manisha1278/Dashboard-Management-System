import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';

import { UserTypeService } from '../../../../../../services/state-services/user-type.service';
import { UserType } from '../../../../../../models/user-type';
import { User } from '../../../../../../models/user';

@Component({
  selector: 'app-user-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatSelectModule
  ],
  templateUrl: './user-dialog.component.html',
  styleUrl: './user-dialog.component.css'
})
export class UserDialogComponent {

  readonly form: FormGroup;

  readonly userTypes: UserType[];

  readonly isSystemUser: boolean;

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<UserDialogComponent>,
    private userTypeService: UserTypeService,

    @Inject(MAT_DIALOG_DATA)
    public data: User | null
  ) {

    this.isSystemUser = data?.isSystem ?? false;

    const allUserTypes = this.userTypeService.getCurrentUserTypes();

    if (this.isSystemUser) {

      // Editing Administrator
      // Show all user types so Administrator can be displayed.
      this.userTypes = allUserTypes;

    } else {

      // Add User or Edit Normal User
      // Hide Administrator user type.
      this.userTypes = allUserTypes.filter(userType => !userType.isSystem);

    }

    this.form = this.fb.group({

      username: [
        data?.username ?? '',
        Validators.required
      ],

      password: [
        '',
        Validators.required
      ],

      fullName: [
        data?.fullName ?? '',
        Validators.required
      ],

      email: [
        data?.email ?? '',
        [
          Validators.required,
          Validators.email
        ]
      ],

      contact: [
        data?.contact ?? '',
        Validators.required
      ],

      userTypeId: [
        data?.userTypeId ?? '',
        Validators.required
      ]

    });

    // Editing existing user
    if (data) {

      this.form.get('password')?.clearValidators();
      this.form.get('password')?.updateValueAndValidity();

    }

    // Prevent editing Administrator details
    if (this.isSystemUser) {

      this.form.get('username')?.disable();
      this.form.get('fullName')?.disable();
      this.form.get('userTypeId')?.disable();

    }

  }

  save(): void {

    if (this.form.invalid) {

      this.form.markAllAsTouched();
      return;

    }

    this.dialogRef.close(this.form.getRawValue());

  }

  cancel(): void {

    this.dialogRef.close();

  }

}
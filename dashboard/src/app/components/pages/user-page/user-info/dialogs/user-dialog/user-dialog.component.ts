import { ChangeDetectorRef, Component, Inject } from '@angular/core';
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

import { UserTypeService } from '../../../../../../services/user-type.service';
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

    this.userTypes =
    this.userTypeService
        .getCurrentUserTypes()
        .filter(userType => !userType.isSystem);

   this.isSystemUser = data?.isSystem ?? false;

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

// If editing an existing user,
// password is not required.
if (data) {

  this.form.get('password')?.clearValidators();

  this.form.get('password')?.updateValueAndValidity();

}
    
    if(this.isSystemUser) {

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

    this.dialogRef.close(this.form.getRawValue()); //getRawValue() is used to get the values of both enabled and disabled controls as well
   
  }

  cancel(): void {

    this.dialogRef.close();

  }

}
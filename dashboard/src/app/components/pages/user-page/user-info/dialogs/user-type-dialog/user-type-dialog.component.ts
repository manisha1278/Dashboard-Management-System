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

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { UserType } from '../../../../../../models/user-type';

@Component({
  selector: 'app-user-type-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule
  ],
  templateUrl: './user-type-dialog.component.html',
  styleUrl: './user-type-dialog.component.css'
})
export class UserTypeDialogComponent {

  readonly userTypeForm: FormGroup;

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<UserTypeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public readonly data: UserType | null
  ) {

    this.userTypeForm = this.fb.group({

      name: [

        data?.name ?? '',

        [

          Validators.required,

          Validators.maxLength(50)

        ]

      ]

    });

  }

  save(): void {

    if (this.userTypeForm.invalid) {

      this.userTypeForm.markAllAsTouched();

      return;

    }

    this.dialogRef.close({

      name: this.userTypeForm.value.name.trim()

    });

  }

  cancel(): void {

    this.dialogRef.close();

  }

}
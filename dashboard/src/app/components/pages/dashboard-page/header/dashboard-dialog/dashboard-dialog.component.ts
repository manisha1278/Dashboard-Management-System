import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import {
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard-dialog',
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatIconModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.css',
})

export class DashboardDialogComponent {

  readonly form: FormGroup;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<DashboardDialogComponent>
  ) {
    this.form = this.fb.group({
      dashboardName: ['', Validators.required]
    });
  }

  save():void {
    if(this.form.invalid){
      this.form.markAllAsTouched();
      return;
    }
    this.dialogRef.close(this.form.value.dashboardName.trim());
  }

  cancel() {
    this.dialogRef.close();
  }
}


import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-edit-dashboard-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule, ReactiveFormsModule, MatIconModule],
  templateUrl: './edit-dashboard-dialog.component.html',
  styleUrl: './edit-dashboard-dialog.component.css',
})
export class EditDashboardDialogComponent {

readonly form:FormGroup;

  constructor(
    private fb:FormBuilder,
    private dialogRef: MatDialogRef<EditDashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.form = this.fb.group({
      dashboardName: [data.name, Validators.required]
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


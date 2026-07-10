import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
@Component({
  selector: 'app-dashboard-dialog',
  imports: [MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,FormsModule,MatIconModule],
  templateUrl: './dashboard-dialog.component.html',
  styleUrl: './dashboard-dialog.component.css',
})

export class DashboardDialogComponent {

  dashboardName = '';

  constructor(
    private dialogRef: MatDialogRef<DashboardDialogComponent>
  ) {}

  save() {
     console.log('Save clicked');
     const name = this.dashboardName.trim();

  if (!name) {
    return;
  }

  console.log('Closing dialog');
  this.dialogRef.close(name);

   
  }

  cancel() {
    this.dialogRef.close();
  }
}


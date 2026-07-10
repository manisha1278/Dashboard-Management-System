import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule } from '@angular/forms';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-edit-dashboard-dialog',
  imports: [MatDialogModule, MatFormFieldModule, MatInputModule, MatButtonModule,FormsModule,MatIconModule],
  templateUrl: './edit-dashboard-dialog.component.html',
  styleUrl: './edit-dashboard-dialog.component.css',
})
export class EditDashboardDialogComponent {


  dashboardName = '';

  constructor(
    private dialogRef: MatDialogRef<EditDashboardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    this.dashboardName = data.name;

  }

  save() {

    this.dialogRef.close(this.dashboardName);

  }

  cancel() {

    this.dialogRef.close();
      
}
}


import { Component, Inject, inject } from '@angular/core';

import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef
} from '@angular/material/dialog';

import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { UserDashboard } from '../../../../../../models/user-dashboard';
import { CommonModule } from '@angular/common';

export interface DashboardAssignmentDialogData {

  dashboards: UserDashboard[];
}
@Component({
  selector: 'app-dashboard-assign-dialog',
  imports: [CommonModule,
    FormsModule,
    MatDialogModule,
    MatButtonModule,
    MatCheckboxModule],
  templateUrl: './dashboard-assign-dialog.component.html',
  styleUrl: './dashboard-assign-dialog.component.css',
})
export class DashboardAssignDialogComponent {
  selectedIds: string[];

  constructor(

    private dialogRef: MatDialogRef<DashboardAssignDialogComponent>,

    @Inject(MAT_DIALOG_DATA)
    public data: DashboardAssignmentDialogData

  ) {

    this.selectedIds = data.dashboards
      .filter(x => x.isAssigned)
      .map(x => x.dashboardId);
  }

  isSelected(id: string): boolean {

    return this.selectedIds.includes(id);

  }

  toggle(id: string, checked: boolean): void {

    if (checked) {

      if (!this.selectedIds.includes(id)) {

        this.selectedIds.push(id);

      }

      return;

    }

    this.selectedIds = this.selectedIds.filter(x => x !== id);

  }

  save(): void {

    this.dialogRef.close({

      dashboardIds: this.selectedIds

    });

  }

  cancel(): void {

    this.dialogRef.close();

  }

}

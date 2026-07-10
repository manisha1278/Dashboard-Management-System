import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Widget } from '../../../../../models/widgets';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-widget-dialog',
  imports: [
  FormsModule,
  MatDialogModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatButtonModule,CommonModule,MatIconModule
],
  templateUrl: './widget-dialog.component.html',
  styleUrl: './widget-dialog.component.css',
})
export class WidgetDialogComponent {
  isEditMode=false;

  widgetName = '';

  chartType = '';

  dashboardId!: string;

  chartTypes = [
    'Line Chart',
    'Bar Chart',
    'Pie Chart'
  ];

  dashboards: any[] = [];

  constructor(
    private dialogRef: MatDialogRef<WidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {

    console.log(this.dashboards);
console.log(Array.isArray(this.dashboards));

   this.dashboards = data?.dashboards ?? [];

    if (data?.widget) {

    this.isEditMode = true;            //showing the widget data in widget dialog

    this.widgetName =
      data.widget.name;

    this.chartType =
      data.widget.chartType;

    this.dashboardId =
      data.widget.dashboardId;

  }

  }

  save() {
    console.log('Save clicked');

  const widget: Widget = {

  //id:this.data.widget.id,
    id: this.isEditMode
      ? this.data.widget.id
      : '',

    name:
      this.widgetName,

    chartType:
      this.chartType,

    dashboardId:
      this.dashboardId

  };

  this.dialogRef.close(widget);

}

  cancel() {

    this.dialogRef.close();

  }

}
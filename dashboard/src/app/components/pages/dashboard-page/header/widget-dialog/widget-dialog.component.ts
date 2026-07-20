import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import {  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule,MatDialogRef} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Widget } from '../../../../../models/widget';
import{MatIconModule} from '@angular/material/icon';
@Component({
  selector: 'app-widget-dialog',
  imports: [
  ReactiveFormsModule,
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

 readonly form: FormGroup;

  chartTypes = [
    'Line Chart',
    'Bar Chart',
    'Pie Chart'
  ];

  dashboards: any[] = [];

  constructor(
    private fb: FormBuilder,
    private dialogRef: MatDialogRef<WidgetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
) {

    this.dashboards = data?.dashboards ?? [];

    this.isEditMode = !!data?.widget;

    this.form = this.fb.group({

        widgetName: [
            data?.widget?.name ?? '',
            Validators.required
        ],

        chartType: [
            data?.widget?.chartType ?? '',
            Validators.required
        ],

        dashboardId: [
            data?.widget?.dashboardId ?? '',
            Validators.required
        ]

    });

}

  save(): void {

    if (this.form.invalid) {

        this.form.markAllAsTouched();

        return;

    }

    const widget: Widget = {

        id: this.isEditMode
            ? this.data.widget.id
            : '',

        name: this.form.value.widgetName,

        chartType: this.form.value.chartType,

        dashboardId: this.form.value.dashboardId

    };

    this.dialogRef.close(widget);

}

  cancel() {

    this.dialogRef.close();

  }

}
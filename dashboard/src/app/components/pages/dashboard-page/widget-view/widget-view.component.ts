import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Dashboard } from '../../../../models/dashboard';
import { Widget } from '../../../../models/widget';

import { DashboardService } from '../../../../services/state-services/dashboard.service';
import { WidgetManager } from '../../../../services/manager-services/widget-manager';

import { combineLatest } from 'rxjs/internal/observable/combineLatest';

import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';

import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';

import { WidgetDialogComponent } from '../header/widget-dialog/widget-dialog.component';

@Component({
  selector: 'app-widget-view',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    LineChartComponent,
    BarChartComponent,
    PieChartComponent,
    MatMenuModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './widget-view.component.html',
  styleUrl: './widget-view.component.css',
})
export class WidgetViewComponent implements OnInit {

  selectedDashboard: Dashboard | null = null;

  widgets: Widget[] = [];

  constructor(
    private dashboardService: DashboardService,
    private dialog: MatDialog,
    private widgetManager: WidgetManager
  ) { }

  ngOnInit(): void {

    combineLatest([
      this.dashboardService.selectedDashboard,
      this.dashboardService.widgets
    ])
    .subscribe(([dashboard, widgets]) => {

      this.selectedDashboard = dashboard;

      this.widgets = widgets;

    });

  }

  editWidget(widget: Widget): void {

    const dialogRef = this.dialog.open(
      WidgetDialogComponent,
      {
        width: '560px',
        panelClass: 'modern-dialog',
        disableClose: true,
        data: {
          dashboards: this.dashboardService.dashboards.value,
          widget: widget
        }
      }
    );

    dialogRef.afterClosed()
      .subscribe((updatedWidget: Widget) => {

        if (!updatedWidget) {

          return;

        }

        this.widgetManager.updateWidget(updatedWidget);

      });

  }

  deleteWidget(widget: Widget): void {

    this.widgetManager.deleteWidget(widget.id);

  }

}
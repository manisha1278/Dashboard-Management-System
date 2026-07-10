import { Component, OnInit } from '@angular/core';
import { Widget } from '../../../../models/widgets';
import { DashboardService } from '../../../../services/dashboard.service';
import{CommonModule} from '@angular/common';
import{MatCardModule} from '@angular/material/card';
import { Dashboard } from '../../../../models/dashboard';
import { combineLatest } from 'rxjs/internal/observable/combineLatest';
import { LineChartComponent } from './line-chart/line-chart.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { MatDialog } from '@angular/material/dialog';
import { WidgetDialogComponent } from '../header/widget-dialog/widget-dialog.component';
import{WidgetApiService} from '../../../../services/widget-api.service';
//import { DashboardApiService } from '../../../../services/dashboard-api.service';

@Component({
  selector: 'app-widget-view',
  standalone: true,
  imports: [CommonModule, MatCardModule, LineChartComponent, BarChartComponent, PieChartComponent,MatMenuModule, MatButtonModule, MatIconModule],
  
  templateUrl: './widget-view.component.html',
  styleUrl: './widget-view.component.css',
})
export class WidgetViewComponent implements OnInit {
  selectedDashboard:Dashboard | null = null;
  widgets:Widget[] = [];
  //allWidgets:Widget[] = [];
  constructor(private dashboardService: DashboardService,private dialog:MatDialog,private widgetApiService: WidgetApiService){}

   ngOnInit(): void {
    

  

  combineLatest([
    this.dashboardService.selectedDashboard,
    this.dashboardService.widgets
  ])
  .subscribe(([dashboard, widgets]) => {

    this.selectedDashboard = dashboard;

    //this.widgets = widgets.filter(
     // widget => widget.dashboardId === dashboard?.id
    //);

   this.widgets = widgets;

  });

}

editWidget(widget: Widget) {
  const dialogRef = this.dialog.open(WidgetDialogComponent, {
    width:'560px',

    panelClass:'modern-dialog',

    disableClose:true,
    data: { 
      dashboards: this.dashboardService.dashboards.value,
     widget: widget 
    }
    });

 dialogRef.afterClosed()
.subscribe(updatedWidget => {

  if (!updatedWidget) return;

  this.widgetApiService
    .updateWidget(updatedWidget.id, updatedWidget)
    .subscribe({

      next: (savedWidget) => {
  console.log('Saved Widget:', savedWidget);//

        const widgets =
          this.dashboardService.widgets.value;

          console.log('Before Update:', widgets);//


        const index =
          widgets.findIndex(
            w => w.id === savedWidget.id
          );
console.log('Index:', index);//
        if (index !== -1) {

          widgets[index] = savedWidget;

          this.dashboardService.widgets.next(
            [...widgets]
          );

        }

      },

      error: (err) => {
        console.error(err);
      }

    });

});

}
deleteWidget(widget: Widget) {

  this.widgetApiService
    .deleteWidget(widget.id)
    .subscribe({

      next: () => {

        const updatedWidgets =
          this.dashboardService.widgets.value
            .filter(w => w.id !== widget.id);

        this.dashboardService.widgets.next(updatedWidgets);

      },

      error: (err) => {
        console.error(err);
      }

    });

}
}


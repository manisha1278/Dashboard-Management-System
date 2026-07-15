import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Dashboard } from '../models/dashboard';
import { Widget } from '../models/widget';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboards = new BehaviorSubject<Dashboard[]>([]);

  selectedDashboard = new BehaviorSubject<Dashboard | null>(null);

  widgets = new BehaviorSubject<Widget[]>([]);
  
  setDashboards(dashboards: Dashboard[]): void {
    this.dashboards.next(dashboards);
  }

  setSelectedDashboard(dashboard: Dashboard | null): void {
    this.selectedDashboard.next(dashboard);
  }

  setWidgets(widgets: Widget[]): void {
    this.widgets.next(widgets);
  }

  
  

}
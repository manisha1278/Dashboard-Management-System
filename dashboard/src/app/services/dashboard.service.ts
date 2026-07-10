import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

import { Dashboard } from '../models/dashboard';
import { Widget } from '../models/widgets';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  dashboards = new BehaviorSubject<Dashboard[]>([]);

  selectedDashboard = new BehaviorSubject<Dashboard | null>(null);

  widgets = new BehaviorSubject<Widget[]>([]);

  
  

}
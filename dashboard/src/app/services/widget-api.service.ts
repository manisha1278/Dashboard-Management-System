import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Widget } from '../models/widgets';
@Injectable({
  providedIn: 'root',
})
export class WidgetApiService {
  constructor(private http: HttpClient) { }

  getWidgets(dashboardId: string) {
    return this.http.get<Widget[]>(`${environment.apiUrl}/dashboard/${dashboardId}/widget`);
  }

  addWidget(widget: {       //used
    name: string;
    chartType: string;
    dashboardId: string;
  }) {
    return this.http.post<Widget>(`${environment.apiUrl}/widget`, widget);
  }

  updateWidget(id: string, widget: Partial<Widget>) {
    return this.http.put<Widget>(`${environment.apiUrl}/widget/${id}`, widget);
  }

  deleteWidget(id: string) {
    return this.http.delete(`${environment.apiUrl}/widget/${id}`);
  }
}


import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserDashboard } from '../../models/user-dashboard';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserDashboardApiService {
  private readonly apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getUserDashboards(userId: string): Observable<UserDashboard[]> {
    return this.http.get<UserDashboard[]>(`${this.apiUrl}/users/${userId}/dashboards`);
  }
  assignDashboards(userId: string, dashboardIds: string[]): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/users/${userId}/dashboards`, dashboardIds);
  }
}

import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

import { UserDashboard } from '../../models/user-dashboard';
import { UserDashboardApiService } from '../api-services/user-dashboard-api.service';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardService {

  private readonly userDashboardsSubject =
    new BehaviorSubject<UserDashboard[]>([]);

  constructor(
    private readonly userDashboardApiService: UserDashboardApiService
  ) { }

  getUserDashboards(): Observable<UserDashboard[]> {

    return this.userDashboardsSubject.asObservable();

  }

  getCurrentUserDashboards(): UserDashboard[] {

    return this.userDashboardsSubject.value;

  }

  load(userId: string): Observable<UserDashboard[]> {

    return this.userDashboardApiService
      .getUserDashboards(userId)
      .pipe(
        tap(dashboards => {
          this.userDashboardsSubject.next(dashboards);
        })
      );
  }

  assignDashboards(
    userId: string,
    dashboardIds: string[]
  ): Observable<void> {

    return this.userDashboardApiService.assignDashboards(
      userId,
      dashboardIds
    );
  }

  clear(): void {
    this.userDashboardsSubject.next([]);
  }

}
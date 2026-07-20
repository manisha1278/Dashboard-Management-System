import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';

import { UserDashboardService } from '../state-services/user-dashboard.service';

@Injectable({
  providedIn: 'root'
})
export class UserDashboardManager {

  constructor(
    private readonly userDashboardService: UserDashboardService
  ) { }

  load(userId: string) {

    return this.userDashboardService.load(userId);

  }

  assignDashboards(
    userId: string,
    dashboardIds: string[]
  ): Observable<void> {

    return this.userDashboardService
      .assignDashboards(userId, dashboardIds)
      .pipe(

        tap(() => {

          this.userDashboardService.load(userId).subscribe();

        })

      );

  }

}

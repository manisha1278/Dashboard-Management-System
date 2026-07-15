import { Injectable } from '@angular/core';
import { Dashboard } from '../../models/dashboard';

import { DashboardApiService } from '../dashboard-api.service';
import { DashboardService } from '../dashboard.service';

@Injectable({
  providedIn: 'root',
})
export class DashboardManager {

  constructor(
    private dashboardApiService: DashboardApiService,
    private dashboardService: DashboardService
  ) {}

  loadDashboards(): void {

    this.dashboardApiService
      .getDashboards()
      .subscribe({

        next: dashboards => {

          this.dashboardService.setDashboards(
            dashboards
          );

          const currentId =
            this.dashboardService.selectedDashboard.value?.id;

          const selectedDashboard =
            dashboards.find(d => d.id === currentId);

          if (selectedDashboard) {

            this.selectDashboard(selectedDashboard);

          }
          else if (dashboards.length > 0) {

            this.selectDashboard(dashboards[0]);

          }
          else {

            this.dashboardService.setSelectedDashboard(
              null
            );

            this.dashboardService.setWidgets([]);

          }

        },

        error: error => {

          console.error(
            'Error loading dashboards',
            error
          );

        }

      });

  }

  selectDashboard(
    dashboard: Dashboard
  ): void {

    this.dashboardService.setSelectedDashboard(
      dashboard
    );

    this.refreshWidgets();

  }

  public refreshWidgets(): void {

    const dashboardId =
      this.dashboardService.selectedDashboard.value?.id;

    if (!dashboardId) {

      this.dashboardService.setWidgets([]);

      return;

    }

    this.dashboardApiService
      .getWidgets(dashboardId)
      .subscribe({

        next: widgets => {

          this.dashboardService.setWidgets(
            widgets
          );

        },

        error: error => {

          console.error(
            'Error loading widgets',
            error
          );

        }

      });

  }
  createDashboard(name: string): void {

  this.dashboardApiService
      .addDashboard(name)
      .subscribe({

        next: newDashboard => {

          const dashboards = [
            ...this.dashboardService.dashboards.value,
            newDashboard
          ];

          this.dashboardService.setDashboards(
            dashboards
          );

          this.selectDashboard(newDashboard);

        },

        error: error => {

          console.error(
            'Error creating dashboard',
            error
          );

        }

      });

}
updateDashboard(
  dashboardId: string,
  updatedName: string
): void {

  this.dashboardApiService
    .updateDashboard(
      dashboardId,
      updatedName
    )
    .subscribe({

      next: updatedDashboard => {

        const dashboards =
          this.dashboardService.dashboards.value;

        const updatedDashboards =
          dashboards.map(d =>
            d.id === updatedDashboard.id
              ? updatedDashboard
              : d
          );

        this.dashboardService.setDashboards(
          updatedDashboards
        );

        const selectedDashboard =
          updatedDashboards.find(
            d => d.id === updatedDashboard.id
          );

        if (selectedDashboard) {

          this.selectDashboard(
            selectedDashboard
          );

        }

      },

      error: error => {

        console.error(
          'Error updating dashboard',
          error
        );

      }

    });

}
deleteDashboard(dashboardId: string): void {

  this.dashboardApiService
    .deleteDashboard(dashboardId)
    .subscribe({

      next: () => {

        const currentDashboards =
          this.dashboardService.dashboards.value;

        const deletedIndex =
          currentDashboards.findIndex(
            d => d.id === dashboardId
          );

        const updatedDashboards =
          currentDashboards.filter(
            d => d.id !== dashboardId
          );

        this.dashboardService.setDashboards(
          updatedDashboards
        );

        if (updatedDashboards.length === 0) {

          this.dashboardService.setSelectedDashboard(null);

          this.dashboardService.setWidgets([]);

          return;

        }

        const nextIndex =
          deletedIndex < updatedDashboards.length
            ? deletedIndex
            : updatedDashboards.length - 1;

        this.selectDashboard(
          updatedDashboards[nextIndex]
        );

      },

      error: error => {

        console.error(
          'Error deleting dashboard',
          error
        );

      }

    });

}

}
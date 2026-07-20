import { Injectable } from '@angular/core';
import { Widget } from '../../models/widget';
import { WidgetApiService } from '../api-services/widget-api.service';
import { DashboardManager } from './dashboard-manager';
import { CreateWidgetDto } from '../../models/createWidgetDto';

@Injectable({
  providedIn: 'root'
})
export class WidgetManager {

  constructor(
    private widgetApiService: WidgetApiService,
    private dashboardManager: DashboardManager
  ) { }

  createWidget(widget: CreateWidgetDto): void {

    this.widgetApiService
      .addWidget(widget)
      .subscribe({

        next: () => {

          this.dashboardManager.refreshWidgets();

        },

        error: error => {

          console.error(
            'Error creating widget',
            error
          );

        }

      });

  }
  updateWidget(widget: Widget): void {

    this.widgetApiService
      .updateWidget(widget.id, widget)
      .subscribe({

        next: () => {

          this.dashboardManager.refreshWidgets();

        },

        error: error => {

          console.error(
            'Error updating widget',
            error
          );

        }

      });

  }

  deleteWidget(widgetId: string): void {

    this.widgetApiService
      .deleteWidget(widgetId)
      .subscribe({

        next: () => {

          this.dashboardManager.refreshWidgets();

        },

        error: error => {

          console.error(
            'Error deleting widget',
            error
          );

        }

      });

  }


}

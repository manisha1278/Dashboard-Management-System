import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../../../models/dashboard';
import { DashboardDialogComponent } from '../../../pages/dashboard-page/header/dashboard-dialog/dashboard-dialog.component';
import { EditDashboardDialogComponent } from '../../../pages/dashboard-page/header/edit-dashboard-dialog/edit-dashboard-dialog.component';
import { WidgetDialogComponent } from '../../../pages/dashboard-page/header/widget-dialog/widget-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../../../services/dashboard.service';
import { WidgetApiService } from '../../../../services/widget-api.service';
import { DashboardApiService } from '../../../../services/dashboard-api.service';
import{Widget} from '../../../../models/widgets';
import { ChangeDetectorRef } from '@angular/core';
import {  MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import{FormsModule} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import{UserType} from '../../../../models/user-type';
import{CreateUserTypeDto} from '../../../../models/createUserTypeDto';
import { UserTypeDialogComponent } from '../../user-page/user-info/dialogs/user-type-dialog/user-type-dialog.component';
import{UserTypeService} from '../../../../services/user-type.service';
import{UserDialogComponent} from '../../user-page/user-info/dialogs/user-dialog/user-dialog.component';
import{UserService} from '../../../../services/user.service';
import{CreateUserDto} from '../../../../models/createUserDto';
import{AuthService} from '../../../../services/auth.service';
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ CommonModule,
    MatDialogModule,
    MatButtonModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatIconModule,
    FormsModule],
   templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
   //selectedDashboard?: Dashboard;
//selectedDashboardId?: string;
 
constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private dashboardApiService: DashboardApiService,
    private widgetApiService: WidgetApiService,
    private router: Router,
    private readonly userTypeService: UserTypeService,
    private readonly userService: UserService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    public readonly authService: AuthService

  ) {}

  get selectedDashboard(): Dashboard | null {

    return this.dashboardService.selectedDashboard.value;

}
get selectedDashboardId(): string | undefined {

    return this.dashboardService.selectedDashboard.value?.id;

}
get dashboards(): Dashboard[] {
  return this.dashboardService.dashboards.value;
}

get widgets() {
    return this.dashboardService.widgets;
  }

  ngOnInit(): void {

    this.loadDashboards();

   
}

 
loadDashboards(): void {

  this.dashboardApiService.getDashboards().subscribe({

    next: (dashboards) => {

      this.dashboardService.dashboards.next(dashboards);

      const currentId = this.dashboardService.selectedDashboard.value?.id;

      const selectedDashboard = dashboards.find(
        d => d.id === currentId
      );

      if (selectedDashboard) {

        this.dashboardService.selectedDashboard.next(
          selectedDashboard
        );

      } else if (dashboards.length > 0) {

        this.dashboardService.selectedDashboard.next(
          dashboards[0]
        );

      }
     if (this.selectedDashboard) {
    this.onDashboardChange();
}

    },

    error: (error) => {

      console.error(
        'Error loading dashboards',
        error
      );

    }

  });

}

onDashboardSelected(dashboard: Dashboard): void {

    
    this.dashboardService.selectedDashboard.next(dashboard);

    
    this.onDashboardChange();
}

onDashboardChange() {

    const id = this.selectedDashboard?.id;

    if (!id) {
        this.dashboardService.widgets.next([]);
        return;
    }

    this.dashboardApiService
        .getWidgets(id)
        .subscribe(widgets => {

            this.dashboardService.widgets.next(widgets);

        });

}



openDashboardDialog(): void {

    const dialogRef = this.dialog.open(
      DashboardDialogComponent,
      {
        width:'480px',

    panelClass:'modern-dialog'
      }
    );

    dialogRef.afterClosed()
      .subscribe((dashboardName: string) => {

        if (!dashboardName) {
          return;
        }

        this.dashboardApiService
          .addDashboard(dashboardName)
          .subscribe({

            next: (newDashboard) => {


              this.dashboardService.dashboards.next([
  ...this.dashboardService.dashboards.value,
  newDashboard
]);

             // this.dashboardService.dashboards = [
 // ...this.dashboardService.dashboards,newDashboard];

  this.dashboardService.selectedDashboard.next(
  newDashboard
);

this.onDashboardChange();

this.changeDetectorRef.detectChanges();
  

            },

            error: (error) => {

              console.error(
                'Error creating dashboard',
                error
              );

            }

          });

      });

  }

openEditDashboardDialog(): void {
  
      if (!this.selectedDashboard) {
        return;
      }
  
      const dialogRef = this.dialog.open(
        EditDashboardDialogComponent,
        {
          width: '480px',

  panelClass: 'modern-dialog',

  disableClose: true,
          data: {
            id: this.selectedDashboard.id,
            name: this.selectedDashboard.name
          }
        }
      );
  
      dialogRef.afterClosed()
        .subscribe((updatedName: string) => {
  
          if (!updatedName) {
            return;
          }
  
          this.dashboardApiService
            .updateDashboard(
              this.selectedDashboard!.id,
              updatedName
            )
            .subscribe({
              
             
              next: (updatedDashboard) => {
  
    const dashboards =
      this.dashboardService.dashboards.value;
  
    const updatedDashboards =
      dashboards.map(d =>
        d.id === updatedDashboard.id
          ? updatedDashboard
          : d
      );
  
    this.dashboardService.dashboards.next(
      updatedDashboards
    );
  
    const selectedDashboard =
  updatedDashboards.find(
    d => d.id === updatedDashboard.id
  );

if (selectedDashboard) {

  this.dashboardService.selectedDashboard.next(
    selectedDashboard
  );
this.onDashboardChange();
}
    
  this.changeDetectorRef.detectChanges();
  
  
  },
  
              error: (error) => {
  
                console.error(
                  'Error updating dashboard',
                  error
                );
  
              }
  
            });
  
        });
  
    }

 openDeleteDashboard(): void {

  if (!this.selectedDashboard) {
    return;
  }

  const dashboardId =
    this.selectedDashboard.id;

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

        this.dashboardService.dashboards.next(
          updatedDashboards
        );

        if (updatedDashboards.length === 0) {

          this.dashboardService.selectedDashboard.next(null);

          return;

        }

        const nextIndex =
          deletedIndex < updatedDashboards.length
            ? deletedIndex
            : updatedDashboards.length - 1;

        this.dashboardService.selectedDashboard.next(
  updatedDashboards[nextIndex]
);
this.onDashboardChange();
this.changeDetectorRef.detectChanges();
      },

      error: (error) => {

        console.error(
          'Error deleting dashboard',
          error
        );

      }

    });

}

openWidgetDialog(): void {

    const dialogRef = this.dialog.open(
      WidgetDialogComponent,
      {
         width:'560px',

    panelClass:'modern-dialog',

    disableClose:true,
        data: {
          dashboards: this.dashboards
        }
      }
    );

    dialogRef.afterClosed()
  .subscribe((widget: Widget) => {
console.log('Dialog Result:', widget);//
    if (!widget) {
      return;
    }
    console.log({
  name: widget.name,
  chartType: widget.chartType,
  dashboardId: widget.dashboardId
});

    this.widgetApiService
      .addWidget({
        name: widget.name,
        chartType: widget.chartType,
        dashboardId: widget.dashboardId
      })
      .subscribe({

       next: (createdWidget) => {

    if (createdWidget.dashboardId === this.selectedDashboard?.id) {
        this.onDashboardChange();
       
    }
 this.changeDetectorRef.detectChanges();
},

        error: (error) => {

          console.error(
            'Error creating widget',
            error
          );

        }

      });

  });

}

get isDashboard(): boolean {
  return this.router.url.startsWith('/dashboard');
}

get isUsers(): boolean {
  return this.router.url.startsWith('/user');
}

openAddUserTypeDialog(): void {

  const dialogRef = this.dialog.open(

    UserTypeDialogComponent,

    {

      width: '500px',

      disableClose: true

    }

  );

  dialogRef.afterClosed().subscribe(result => {

    if (!result) {

      return;

    }

    this.userTypeService.create(result);

  });

}
openAddUserDialog(): void {

  const dialogRef = this.dialog.open(

    UserDialogComponent,

    {

      width: '600px',

      disableClose: true,

      data: null

    }

  );

  dialogRef.afterClosed().subscribe((dto: CreateUserDto | undefined) => {

    if (!dto) {

      return;

    }

    this.userService.create(dto);

  });

}
}


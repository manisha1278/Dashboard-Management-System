import { Component, OnInit } from '@angular/core';
import { Dashboard } from '../../../../models/dashboard';
import { DashboardDialogComponent } from '../../../pages/dashboard-page/header/dashboard-dialog/dashboard-dialog.component';
import { EditDashboardDialogComponent } from '../../../pages/dashboard-page/header/edit-dashboard-dialog/edit-dashboard-dialog.component';
import { WidgetDialogComponent } from '../../../pages/dashboard-page/header/widget-dialog/widget-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { DashboardService } from '../../../../services/state-services/dashboard.service';
import{UserTypeManager} from '../../../../services/manager-services/usertype-manager';
import{ DashboardManager } from '../../../../services/manager-services/dashboard-manager';
import{Widget} from '../../../../models/widget';
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
import { UserTypeDialogComponent } from '../../user-page/user-info/dialogs/user-type-dialog/user-type-dialog.component';
import{UserDialogComponent} from '../../user-page/user-info/dialogs/user-dialog/user-dialog.component';
import{CreateUserDto} from '../../../../models/createUserDto';
import{AuthService} from '../../../../services/state-services/auth.service';
import{WidgetManager} from '../../../../services/manager-services/widget-manager';
import { UserManager } from '../../../../services/manager-services/user-manager';
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
 
 
constructor(
    private dialog: MatDialog,
    private dashboardService: DashboardService,
    private dashboardManager: DashboardManager,
  
    private router: Router,
    private readonly userTypeManager: UserTypeManager,
   private readonly userManager: UserManager,
    public readonly authService: AuthService,
    private readonly widgetManager: WidgetManager

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

    this.dashboardManager.loadDashboards();

   
}

 


onDashboardSelected(dashboard: Dashboard): void {

    
    this.dashboardManager.selectDashboard(dashboard);

}





openDashboardDialog(): void {

  const dialogRef = this.dialog.open(
    DashboardDialogComponent,
    {
      width: '480px',
      panelClass: 'modern-dialog'
    }
  );

  dialogRef.afterClosed()
    .subscribe((dashboardName: string) => {

      if (!dashboardName) {
        return;
      }

      this.dashboardManager.createDashboard(
        dashboardName
      );

    

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
  
          this.dashboardManager.updateDashboard(
          this.selectedDashboard!.id,
          updatedName
          );

            
        });
}

 openDeleteDashboard(): void {

  if (!this.selectedDashboard) {
    return;
  }

  

  this.dashboardManager.deleteDashboard(
    this.selectedDashboard.id
);



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

    this.widgetManager.createWidget(widget);
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

    this.userTypeManager.create(result);

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

    this.userManager.create(dto);

  });

}
}


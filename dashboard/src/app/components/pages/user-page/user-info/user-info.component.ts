import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Subject, take, takeUntil } from 'rxjs';
import{MatDividerModule} from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

import { TreeNode } from 'primeng/api';
import { ChangeDetectorRef } from '@angular/core';
import { UserSelectionService } from '../../../../services/user-selection.service';
import { UserService } from '../../../../services/user.service';
import { UserTypeService } from '../../../../services/user-type.service';

import { User } from '../../../../models/user';
import { UserType } from '../../../../models/user-type';
import { MatDialog } from '@angular/material/dialog';
import { UserTypeDialogComponent } from './dialogs/user-type-dialog/user-type-dialog.component';
import { UserDialogComponent } from './dialogs/user-dialog/user-dialog.component';
import { DashboardAssignDialogComponent } from './dialogs/dashboard-assign-dialog/dashboard-assign-dialog.component';
import { AssignDashboardDto } from '../../../../models/assigndashboardDto';
import { UserDashboardService } from '../../../../services/user-dashboard.service';
@Component({
  selector: 'app-user-info',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatIconModule,
    MatDividerModule
  ],
  templateUrl: './user-info.component.html',
  styleUrl: './user-info.component.css'
})
export class UserInfoComponent implements OnInit, OnDestroy {

  private readonly destroy$ = new Subject<void>();

  selectedNode: TreeNode | null = null;

  selectedUser: User | null = null;

  selectedUserType: UserType | null = null;

  selectedUserTypeName = '';

  totalUsers = 0;

  assignedDashboardNames: string[] = [];


  constructor(
    private readonly selectionService: UserSelectionService,
    private readonly userService: UserService,
    private readonly userTypeService: UserTypeService,
    private readonly dialog: MatDialog,

    private readonly userDashboardService: UserDashboardService,
 private readonly changeDetectorRef: ChangeDetectorRef
  ) { }

  ngOnInit(): void {
 
    this.selectionService
      .getSelectedNode()
      .pipe(takeUntil(this.destroy$))
      .subscribe(node => {
  console.log('UserInfo received node:', node);
        this.resetView();

        this.selectedNode = node;

        if (!node) {
          return;
        }

        if (node.data.type === 'User') {

          this.loadUser(node.data.id);

        }
        else if (node.data.type === 'UserType') {

          this.loadUserType(node.data.id);

        }



      });


  }

  private loadUser(userId: string): void {
 console.log('Loading user:', userId);
    this.selectedUser =
      this.userService.getById(userId) ?? null;



    if (!this.selectedUser) {
      return;
    }

    const userType =
      this.userTypeService.getById(this.selectedUser.userTypeId);

    this.selectedUserTypeName = userType?.name ?? '';

    this.userDashboardService
    .load(userId)
    .subscribe({

        next: dashboards => {
 console.log('HTTP completed for:', userId);
            this.assignedDashboardNames = dashboards
                .filter(x => x.isAssigned)
                .map(x => x.dashboardName);


        console.log('Dashboard names:', this.assignedDashboardNames);
        this.changeDetectorRef.detectChanges();
        },

        error: error => {

            console.error(error);

        }

    });
  
  }

  private loadUserType(userTypeId: string): void {

    this.selectedUserType =
      this.userTypeService.getById(userTypeId) ?? null;

    if (!this.selectedUserType) {
      return;
    }

    this.totalUsers =
      this.userService
        .getCurrentUsers()
        .filter(user => user.userTypeId === userTypeId).length;

  }

  private resetView(): void {



    this.selectedUser = null;

    this.selectedUserType = null;

    this.selectedUserTypeName = '';

    this.totalUsers = 0;

    this.assignedDashboardNames = [];

  }
  getInitials(name: string): string {

    if (!name) {
      return '';
    }

    const words = name.trim().split(' ');

    if (words.length === 1) {
      return words[0][0].toUpperCase();
    }

    return (
      words[0][0] +
      words[1][0]
    ).toUpperCase();

  }
  openEditUserTypeDialog(): void {

    if (!this.selectedUserType) {
      return;
    }

    const dialogRef = this.dialog.open(
      UserTypeDialogComponent,
      {
        width: '500px',
        disableClose: true,
        data: this.selectedUserType
      }
    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.userTypeService.update({

        ...this.selectedUserType!,

        name: result.name

      });
     
      this.changeDetectorRef.detectChanges();

    });
    

  }
  openEditUserDialog(): void {
    console.log('openEditUserDialog called');
    if (!this.selectedUser) {
      console.log('No user selected');
      return;
    }
    console.log('Selected user:', this.selectedUser);

    const dialogRef = this.dialog.open(

      UserDialogComponent,

      {

        width: '650px',

        disableClose: true,

        data: this.selectedUser

      }

    );

    dialogRef.afterClosed().subscribe(result => {

      if (!result) {
        return;
      }

      this.userService.update({

        ...this.selectedUser!,

        username: result.username,

        fullName: result.fullName,

        email: result.email,

        contact: result.contact,

        userTypeId: result.userTypeId

      });
        this.loadUser(this.selectedUser!.id);
      this.changeDetectorRef.detectChanges();

    });
   
  }


  openAssignDashboardDialog(): void {

  if (!this.selectedUser) {
    return;
  }

  this.userDashboardService.load(this.selectedUser.id);

  this.userDashboardService
    .getUserDashboards()
    .pipe(take(1))
    .subscribe(dashboards => {

      const dialogRef = this.dialog.open(
        DashboardAssignDialogComponent,
        {
          width: '550px',
          disableClose: true,
          data: {
            dashboards: dashboards
          }
        }
      );

      dialogRef.afterClosed().subscribe(
        (result: AssignDashboardDto | undefined) => {

          if (!result) {
            return;
          }

          this.userDashboardService
  .assignDashboards(
    this.selectedUser!.id,
    result.dashboardIds
  )
  .subscribe({

    next: () => {

      this.userDashboardService.load(this.selectedUser!.id);
      this.loadUser(this.selectedUser!.id);

    }
  ,

    error: error => {

      console.error(error);

    }

  });

        });

    });

}
  ngOnDestroy(): void {

    this.destroy$.next();

    this.destroy$.complete();

  }

}
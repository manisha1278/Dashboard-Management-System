import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserTreeComponent } from './user-tree/user-tree.component';
import { UserTypeService } from '../../../services/user-type.service';
import { UserService } from '../../../services/user.service';


@Component({
  selector: 'app-user-page',
  imports: [UserTreeComponent, UserInfoComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  constructor(private readonly userService: UserService,
      private readonly userTypeService: UserTypeService) {}
  
 ngOnInit(): void {

    this.userTypeService.load();

    this.userService.load();

  }
  

 }

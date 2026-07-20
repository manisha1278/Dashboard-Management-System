import { Component, OnInit } from '@angular/core';
import { UserInfoComponent } from './user-info/user-info.component';
import { UserTreeComponent } from './user-tree/user-tree.component';
import{UserManager} from '../../../services/manager-services/user-manager';
import{UserTypeManager} from '../../../services/manager-services/usertype-manager';


@Component({
  selector: 'app-user-page',
  imports: [UserTreeComponent, UserInfoComponent],
  templateUrl: './user-page.component.html',
  styleUrl: './user-page.component.css',
})
export class UserPageComponent implements OnInit {
  constructor(private readonly userTypeManager: UserTypeManager,
    private readonly userManager: UserManager) { }

  ngOnInit(): void {

    this.userTypeManager.load();

    this.userManager.load();

  }


}

import { Component, OnInit } from '@angular/core';
import { AsyncPipe } from '@angular/common';

import { TreeModule, TreeNodeSelectEvent } from 'primeng/tree';
import { TreeNode} from 'primeng/api';

import { MatIconModule } from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

import { UserSelectionService } from '../../../../services/user-selection.service';
import { UserTreeService } from '../../../../services/user-tree.service';
import { UserService } from '../../../../services/user.service';
import { UserTypeService } from '../../../../services/user-type.service';

@Component({
  selector: 'app-user-tree',
  standalone: true,
  imports: [
    TreeModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    AsyncPipe
  ],
  templateUrl: './user-tree.component.html',
  styleUrl: './user-tree.component.css'
})
export class UserTreeComponent{

  readonly userTreeNodes$: Observable<TreeNode[]>;


  constructor(
    private readonly userService: UserService,
    private readonly userTypeService: UserTypeService,
    private readonly userTreeService: UserTreeService,
    private readonly userSelectionService: UserSelectionService
  ) {
    this.userTreeNodes$ = this.createTree();
  }

 
  private createTree(): Observable<TreeNode[]> {

    return combineLatest([
      this.userTypeService.getUserTypes(),
      this.userService.getUsers()
    ]).pipe(
      map(([userTypes, users]) =>
        this.userTreeService.buildTree(userTypes, users)
      )
    );

  }

  
  onNodeSelect({ node }: TreeNodeSelectEvent): void {
 console.log('Tree Selected:', node);
    if (!node) {
      return;
    }

    this.userSelectionService.selectNode(node);

  }

}
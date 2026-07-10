import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';

import { User } from '../models/user';
import { UserType } from '../models/user-type';

@Injectable({
  providedIn: 'root'
})
export class UserTreeService {

  private readonly expandByDefault = true;

  buildTree(
    userTypes: UserType[],
    users: User[]
  ): TreeNode[] {

    return userTypes.map(userType => {

      const children: TreeNode[] = users

        .filter(user => user.userTypeId === userType.id)

        .map(user => ({

          key: `user-${user.id}`,

          label: user.fullName,

          icon: 'pi pi-user',

          leaf: true,

          data: {

            id: user.id,

            type: 'User'

          }

        }));

      return {

        key: `type-${userType.id}`,

        label: userType.name,

        icon: 'pi pi-sitemap',

        expanded: this.expandByDefault,

        data: {

          id: userType.id,

          type: 'UserType'

        },

        children

      };

    });

  }

}
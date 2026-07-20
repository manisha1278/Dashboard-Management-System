import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserSelectionService {

  private readonly selectedNodeSubject =
    new BehaviorSubject<TreeNode | null>(null);

  getSelectedNode(): Observable<TreeNode | null> {
    return this.selectedNodeSubject.asObservable();
  }

  selectNode(node: TreeNode): void {
    if (this.selectedNodeSubject.value?.key === node.key) {
      return;
    }
    this.selectedNodeSubject.next(node);
  }

  clearSelection(): void {
    this.selectedNodeSubject.next(null);
  }

}
import { TestBed } from '@angular/core/testing';

import { UserTreeService } from './state-services/user-tree.service';

describe('UserTreeService', () => {
  let service: UserTreeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTreeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

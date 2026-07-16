import { TestBed } from '@angular/core/testing';

import { UserDashboardManager } from './user-dashboard-manager';

describe('UserDashboardManager', () => {
  let service: UserDashboardManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDashboardManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

import { TestBed } from '@angular/core/testing';

import { UserDashboardApiService } from './user-dashboard-api.service';

describe('UserDashboardApiService', () => {
  let service: UserDashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserDashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

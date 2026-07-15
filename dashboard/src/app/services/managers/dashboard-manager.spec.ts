import { TestBed } from '@angular/core/testing';

import { DashboardManager } from './dashboard-manager';

describe('DashboardManager', () => {
  let service: DashboardManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashboardManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

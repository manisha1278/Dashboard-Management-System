import { TestBed } from '@angular/core/testing';

import { UserTypeApiService } from './api-services/user-type-api.service';

describe('UserTypeApiService', () => {
  let service: UserTypeApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserTypeApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

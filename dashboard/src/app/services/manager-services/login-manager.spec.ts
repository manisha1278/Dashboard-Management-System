import { TestBed } from '@angular/core/testing';

import { LoginManager } from './login-manager';

describe('LoginManager', () => {
  let service: LoginManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LoginManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

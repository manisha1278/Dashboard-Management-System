import { TestBed } from '@angular/core/testing';

import { UsertypeManager } from './usertype-manager';

describe('UsertypeManager', () => {
  let service: UsertypeManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsertypeManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

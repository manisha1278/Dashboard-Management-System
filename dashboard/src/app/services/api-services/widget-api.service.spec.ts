import { TestBed } from '@angular/core/testing';

import { WidgetApiService } from './api-services/widget-api.service';

describe('WidgetApiService', () => {
  let service: WidgetApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

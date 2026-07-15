import { TestBed } from '@angular/core/testing';

import { WidgetManager } from './widget-manager';

describe('WidgetManager', () => {
  let service: WidgetManager;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WidgetManager);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

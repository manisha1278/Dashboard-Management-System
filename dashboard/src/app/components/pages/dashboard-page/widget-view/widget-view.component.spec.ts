import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetViewComponent } from './widget-view.component';

describe('WidgetViewComponent', () => {
  let component: WidgetViewComponent;
  let fixture: ComponentFixture<WidgetViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WidgetViewComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(WidgetViewComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

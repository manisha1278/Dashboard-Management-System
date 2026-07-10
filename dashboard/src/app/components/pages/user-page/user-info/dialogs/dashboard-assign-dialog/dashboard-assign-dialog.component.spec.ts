import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardAssignDialogComponent } from './dashboard-assign-dialog.component';

describe('DashboardAssignDialogComponent', () => {
  let component: DashboardAssignDialogComponent;
  let fixture: ComponentFixture<DashboardAssignDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardAssignDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DashboardAssignDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

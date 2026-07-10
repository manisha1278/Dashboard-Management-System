import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDashboardDialogComponent } from './edit-dashboard-dialog.component';

describe('EditDashboardDialogComponent', () => {
  let component: EditDashboardDialogComponent;
  let fixture: ComponentFixture<EditDashboardDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditDashboardDialogComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(EditDashboardDialogComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

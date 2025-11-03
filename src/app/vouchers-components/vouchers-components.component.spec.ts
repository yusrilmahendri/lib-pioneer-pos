import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VouchersComponentsComponent } from './vouchers-components.component';

describe('VouchersComponentsComponent', () => {
  let component: VouchersComponentsComponent;
  let fixture: ComponentFixture<VouchersComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VouchersComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VouchersComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

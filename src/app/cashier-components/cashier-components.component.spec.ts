import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CashierComponentsComponent } from './cashier-components.component';

describe('CashierComponentsComponent', () => {
  let component: CashierComponentsComponent;
  let fixture: ComponentFixture<CashierComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CashierComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CashierComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

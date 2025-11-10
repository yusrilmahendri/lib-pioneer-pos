import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionComponentsComponent } from './transaction-components.component';

describe('TransactionComponentsComponent', () => {
  let component: TransactionComponentsComponent;
  let fixture: ComponentFixture<TransactionComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TransactionComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TransactionComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

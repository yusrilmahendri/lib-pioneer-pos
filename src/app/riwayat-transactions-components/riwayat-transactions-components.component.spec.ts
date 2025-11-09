import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RiwayatTransactionsComponentsComponent } from './riwayat-transactions-components.component';

describe('RiwayatTransactionsComponentsComponent', () => {
  let component: RiwayatTransactionsComponentsComponent;
  let fixture: ComponentFixture<RiwayatTransactionsComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RiwayatTransactionsComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RiwayatTransactionsComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

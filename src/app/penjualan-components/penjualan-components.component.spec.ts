import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PenjualanComponentsComponent } from './penjualan-components.component';

describe('PenjualanComponentsComponent', () => {
  let component: PenjualanComponentsComponent;
  let fixture: ComponentFixture<PenjualanComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PenjualanComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PenjualanComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PengeluaranComponentsComponent } from './pengeluaran-components.component';

describe('PengeluaranComponentsComponent', () => {
  let component: PengeluaranComponentsComponent;
  let fixture: ComponentFixture<PengeluaranComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PengeluaranComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PengeluaranComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

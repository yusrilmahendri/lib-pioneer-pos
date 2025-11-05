import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePengeluaranComponentsComponent } from './create-pengeluaran-components.component';

describe('CreatePengeluaranComponentsComponent', () => {
  let component: CreatePengeluaranComponentsComponent;
  let fixture: ComponentFixture<CreatePengeluaranComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatePengeluaranComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatePengeluaranComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

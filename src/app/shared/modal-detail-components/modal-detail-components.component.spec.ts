import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDetailComponentsComponent } from './modal-detail-components.component';

describe('ModalDetailComponentsComponent', () => {
  let component: ModalDetailComponentsComponent;
  let fixture: ComponentFixture<ModalDetailComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalDetailComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDetailComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

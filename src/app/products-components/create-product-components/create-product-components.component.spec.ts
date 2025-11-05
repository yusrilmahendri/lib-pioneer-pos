import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateProductComponentsComponent } from './create-product-components.component';

describe('CreateProductComponentsComponent', () => {
  let component: CreateProductComponentsComponent;
  let fixture: ComponentFixture<CreateProductComponentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreateProductComponentsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateProductComponentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

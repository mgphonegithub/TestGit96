import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatePackageCategoryComponent } from './create-package-category.component';

describe('CreatePackageCategoryComponent', () => {
  let component: CreatePackageCategoryComponent;
  let fixture: ComponentFixture<CreatePackageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreatePackageCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreatePackageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

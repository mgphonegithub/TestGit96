import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatePackageCategoryComponent } from './update-package-category.component';

describe('UpdatePackageCategoryComponent', () => {
  let component: UpdatePackageCategoryComponent;
  let fixture: ComponentFixture<UpdatePackageCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UpdatePackageCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatePackageCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

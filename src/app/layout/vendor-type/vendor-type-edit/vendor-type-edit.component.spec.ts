import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTypeEditComponent } from './vendor-type-edit.component';

describe('VendorTypeEditComponent', () => {
  let component: VendorTypeEditComponent;
  let fixture: ComponentFixture<VendorTypeEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTypeEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTypeEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

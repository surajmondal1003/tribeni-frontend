import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendorTypeAddComponent } from './vendor-type-add.component';

describe('VendorTypeAddComponent', () => {
  let component: VendorTypeAddComponent;
  let fixture: ComponentFixture<VendorTypeAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendorTypeAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendorTypeAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UomAddComponent } from './uom-add.component';

describe('UomAddComponent', () => {
  let component: UomAddComponent;
  let fixture: ComponentFixture<UomAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UomAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UomAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

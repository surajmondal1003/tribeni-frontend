import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReverseGrnAddComponent } from './reverse-grn-add.component';

describe('ReverseGrnAddComponent', () => {
  let component: ReverseGrnAddComponent;
  let fixture: ComponentFixture<ReverseGrnAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReverseGrnAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReverseGrnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

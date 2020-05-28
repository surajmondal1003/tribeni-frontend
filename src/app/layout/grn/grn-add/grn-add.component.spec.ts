import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnAddComponent } from './grn-add.component';

describe('GrnAddComponent', () => {
  let component: GrnAddComponent;
  let fixture: ComponentFixture<GrnAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

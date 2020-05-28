import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GrnDetailsComponent } from './grn-details.component';

describe('GrnDetailsComponent', () => {
  let component: GrnDetailsComponent;
  let fixture: ComponentFixture<GrnDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GrnDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GrnDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

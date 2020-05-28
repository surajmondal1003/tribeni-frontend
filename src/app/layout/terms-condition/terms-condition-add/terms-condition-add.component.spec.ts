import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TermsConditionAddComponent } from './terms-condition-add.component';

describe('TermsConditionAddComponent', () => {
  let component: TermsConditionAddComponent;
  let fixture: ComponentFixture<TermsConditionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TermsConditionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TermsConditionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

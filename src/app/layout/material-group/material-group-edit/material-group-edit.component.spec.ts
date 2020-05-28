import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupEditComponent } from './material-group-edit.component';

describe('MaterialGroupEditComponent', () => {
  let component: MaterialGroupEditComponent;
  let fixture: ComponentFixture<MaterialGroupEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGroupEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

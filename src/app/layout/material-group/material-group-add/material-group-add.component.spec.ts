import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupAddComponent } from './material-group-add.component';

describe('MaterialGroupAddComponent', () => {
  let component: MaterialGroupAddComponent;
  let fixture: ComponentFixture<MaterialGroupAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGroupAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

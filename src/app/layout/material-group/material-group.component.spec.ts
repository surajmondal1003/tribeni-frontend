import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialGroupComponent } from './material-group.component';

describe('MaterialGroupComponent', () => {
  let component: MaterialGroupComponent;
  let fixture: ComponentFixture<MaterialGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

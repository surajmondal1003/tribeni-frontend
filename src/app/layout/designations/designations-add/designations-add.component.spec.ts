import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DesignationsAddComponent } from './designations-add.component';

describe('DesignationsAddComponent', () => {
  let component: DesignationsAddComponent;
  let fixture: ComponentFixture<DesignationsAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DesignationsAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DesignationsAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

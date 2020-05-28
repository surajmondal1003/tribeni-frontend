import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActivatePermissionEditComponent } from './module-activate-permission-edit.component';

describe('ModuleActivatePermissionEditComponent', () => {
  let component: ModuleActivatePermissionEditComponent;
  let fixture: ComponentFixture<ModuleActivatePermissionEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleActivatePermissionEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActivatePermissionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

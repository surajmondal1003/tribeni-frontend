import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActivatePermissionComponent } from './module-activate-permission.component';

describe('ModuleActivatePermissionComponent', () => {
  let component: ModuleActivatePermissionComponent;
  let fixture: ComponentFixture<ModuleActivatePermissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleActivatePermissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActivatePermissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

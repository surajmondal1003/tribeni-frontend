import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ModuleActivatePermissionAddComponent } from './module-activate-permission-add.component';

describe('ModuleActivatePermissionAddComponent', () => {
  let component: ModuleActivatePermissionAddComponent;
  let fixture: ComponentFixture<ModuleActivatePermissionAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ModuleActivatePermissionAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ModuleActivatePermissionAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

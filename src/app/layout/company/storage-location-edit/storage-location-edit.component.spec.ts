import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationEditComponent } from './storage-location-edit.component';

describe('StorageLocationEditComponent', () => {
  let component: StorageLocationEditComponent;
  let fixture: ComponentFixture<StorageLocationEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageLocationEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageLocationEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

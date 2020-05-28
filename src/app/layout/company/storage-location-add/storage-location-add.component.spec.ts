import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationAddComponent } from './storage-location-add.component';

describe('StorageLocationAddComponent', () => {
  let component: StorageLocationAddComponent;
  let fixture: ComponentFixture<StorageLocationAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageLocationAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageLocationAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

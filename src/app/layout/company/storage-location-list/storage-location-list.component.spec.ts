import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StorageLocationListComponent } from './storage-location-list.component';

describe('StorageLocationListComponent', () => {
  let component: StorageLocationListComponent;
  let fixture: ComponentFixture<StorageLocationListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StorageLocationListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StorageLocationListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

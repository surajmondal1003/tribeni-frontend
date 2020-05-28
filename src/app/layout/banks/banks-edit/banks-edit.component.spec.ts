import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksEditComponent } from './banks-edit.component';

describe('BanksEditComponent', () => {
  let component: BanksEditComponent;
  let fixture: ComponentFixture<BanksEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BanksAddComponent } from './banks-add.component';

describe('BanksAddComponent', () => {
  let component: BanksAddComponent;
  let fixture: ComponentFixture<BanksAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BanksAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BanksAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

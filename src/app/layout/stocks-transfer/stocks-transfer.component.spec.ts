import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksTransferComponent } from './stocks-transfer.component';

describe('StocksTransferComponent', () => {
  let component: StocksTransferComponent;
  let fixture: ComponentFixture<StocksTransferComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksTransferComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksTransferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

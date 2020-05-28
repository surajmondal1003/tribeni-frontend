import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksTransferAddComponent } from './stocks-transfer-add.component';

describe('StocksTransferAddComponent', () => {
  let component: StocksTransferAddComponent;
  let fixture: ComponentFixture<StocksTransferAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksTransferAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksTransferAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

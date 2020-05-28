import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksIssueComponent } from './stocks-issue.component';

describe('StocksIssueComponent', () => {
  let component: StocksIssueComponent;
  let fixture: ComponentFixture<StocksIssueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksIssueComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksIssueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

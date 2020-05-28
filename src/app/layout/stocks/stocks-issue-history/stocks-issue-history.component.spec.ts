import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StocksIssueHistoryComponent } from './stocks-issue-history.component';

describe('StocksIssueHistoryComponent', () => {
  let component: StocksIssueHistoryComponent;
  let fixture: ComponentFixture<StocksIssueHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StocksIssueHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StocksIssueHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

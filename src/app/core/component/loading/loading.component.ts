import { Component, OnInit, Input } from '@angular/core';

export enum LoadingState {
  NotReady,
  Processing,
  Ready
}

@Component({
  selector: 'loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})

export class LoadingComponent implements OnInit {

  LoadingStateType = LoadingState; // pass type to template
  loading = LoadingState.NotReady;

  @Input('state') state: LoadingState;

  constructor() { }

  ngOnInit() {
  }


}

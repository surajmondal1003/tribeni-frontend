import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// core
import { CoreModule } from "./core/core.module";
import { NgxPermissionsModule } from 'ngx-permissions';
import { AgmCoreModule } from '@agm/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CoreModule,
    CoreModule.forRoot(),
    ToastrModule.forRoot(),
    NgxPermissionsModule.forRoot(),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDCwmrD9NEiBAtmQS8_UfaIO4wFg99N8MU'
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

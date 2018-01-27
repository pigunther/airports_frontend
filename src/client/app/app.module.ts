import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { AboutModule } from './about/about.module';
import { HomeModule } from './home/home.module';
import { SharedModule } from './shared/shared.module';


import { PanelModule, ToolbarModule } from 'primeng/primeng';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FlightPanelModule } from './flightPanel/flightPanel.module';
import { AirportMapModule } from './airportMap/airportMap.module';
import {AdminPanelModule} from "./adminPanel/adminPanel.module";

@NgModule({
  imports: [BrowserModule,
            HttpClientModule,
            AppRoutingModule,
            AboutModule,
            HomeModule,
            FlightPanelModule,
            AirportMapModule,
            AdminPanelModule,
            PanelModule,
            ToolbarModule,
            SharedModule.forRoot(),
            BrowserAnimationsModule],
  declarations: [AppComponent],
  providers: [{
    provide: APP_BASE_HREF,
    useValue: '<%= APP_BASE %>'
  }],
  bootstrap: [AppComponent]

})
export class AppModule { }

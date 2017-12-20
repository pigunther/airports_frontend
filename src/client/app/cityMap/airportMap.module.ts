import {ModuleWithProviders, NgModule} from '@angular/core';
import {AirportMapComponent} from './airportMap.component';
import { AirportMapRoutingModule } from './airportMap-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import {
  PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule,
  GMapModule, DialogModule, GrowlModule, CheckboxModule
} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightOfferModule} from "../flightOffer/flightOffer.module";
import {FlightLoadService} from "../services/FlightLoad.service";

@NgModule({
  imports: [AirportMapRoutingModule,
            SharedModule,
            CommonModule,
            RouterModule,
            FormsModule,
            PanelModule,
            ToolbarModule,
            ButtonModule,
            TooltipModule,
            CalendarModule,
            AutoCompleteModule,
            SliderModule,
            FlightOfferModule,
            GMapModule,
            DialogModule,
            GrowlModule,
            CheckboxModule
            ],
  declarations: [AirportMapComponent],
  exports: [AirportMapComponent],
  providers: [NameListService,
              FlightLoadService]
})
export class AirportMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AirportMapModule,
      providers: [NameListService]
    };
  }
}

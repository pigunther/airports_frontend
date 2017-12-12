import {ModuleWithProviders, NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule } from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightOfferComponent} from "./flightOffer.component";

@NgModule({
  imports: [
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
            SliderModule
            ],
  declarations: [FlightOfferComponent],
  exports: [FlightOfferComponent],
  providers: [NameListService]
})
export class FlightOfferModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightOfferModule,
      providers: [NameListService]
    };
  }
}

import {ModuleWithProviders, NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import {
  PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule,
  DialogModule
} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightComplexOfferComponent} from "./flightComplexOffer.component";

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
            SliderModule,
            DialogModule
            ],
  declarations: [FlightComplexOfferComponent],
  exports: [FlightComplexOfferComponent],
  providers: [NameListService]
})
export class FlightComplexOfferModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightComplexOfferModule,
      providers: [NameListService]
    };
  }
}

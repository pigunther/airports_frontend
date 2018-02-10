import {ModuleWithProviders, NgModule} from '@angular/core';
import { FlightPanelComponent } from './flightPanel.component';
import { FlightPanelRoutingModule } from './flightPanel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import {
  PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule,
  TabViewModule, RadioButtonModule
} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightOfferModule} from "../flightOffer/flightOffer.module";
import {FlightLoadService} from "../services/FlightLoad.service";
import {FlightMapModule} from "../flightMap/flightMap.module";
import {FlightComplexOfferModule} from "../flightComplexOffer/flightComplexOffer.module";
import {ListboxModule} from "primeng/listbox";

@NgModule({
  imports: [FlightPanelRoutingModule,
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
            FlightMapModule,
            FlightComplexOfferModule,
            TabViewModule,
            RadioButtonModule
            ],
  declarations: [FlightPanelComponent],
  exports: [FlightPanelComponent],
  providers: [NameListService,
              FlightLoadService]
})
export class FlightPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightPanelModule,
      providers: [NameListService]
    };
  }
}

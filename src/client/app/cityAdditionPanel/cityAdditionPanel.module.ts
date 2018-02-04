import {ModuleWithProviders, NgModule} from '@angular/core';
import {CityAdditionPanelComponent} from './cityAdditionPanel.component';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { PanelModule, ToolbarModule, ButtonModule, TooltipModule,
  CalendarModule, AutoCompleteModule, SliderModule, KeyFilterModule } from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportMapModule} from "../airportMap/airportMap.module";
import {AirportCitiesService} from "../services/AirportCities.service";

@NgModule({
  imports: [SharedModule,
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
            AirportMapModule,
            KeyFilterModule
            ],
  declarations: [CityAdditionPanelComponent],
  exports: [CityAdditionPanelComponent],
  providers: [NameListService,
              AirportCitiesService]
})
export class CityAdditionPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CityAdditionPanelModule,
      providers: [NameListService]
    };
  }
}

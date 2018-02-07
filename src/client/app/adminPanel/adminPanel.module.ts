import {ModuleWithProviders, NgModule} from '@angular/core';
import {AdminPanelComponent} from './adminPanel.component';
import { AdminPanelRoutingModule } from './adminPanel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import {
  PanelModule, ToolbarModule, ButtonModule, TooltipModule,
  CalendarModule, AutoCompleteModule, SliderModule, KeyFilterModule, TabViewModule
} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportMapModule} from "../airportMap/airportMap.module";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityAdditionPanelModule} from "../cityAdditionPanel/cityAdditionPanel.module";

@NgModule({
  imports: [AdminPanelRoutingModule,
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
            AirportMapModule,
            CityAdditionPanelModule,
            KeyFilterModule,
            TabViewModule
            ],
  declarations: [AdminPanelComponent],
  exports: [AdminPanelComponent],
  providers: [NameListService,
              AirportCitiesService]
})
export class AdminPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminPanelModule,
      providers: [NameListService]
    };
  }
}

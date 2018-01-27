import {ModuleWithProviders, NgModule} from '@angular/core';
import {AdminPanelComponent} from './adminPanel.component';
import { AdminPanelRoutingModule } from './adminPanel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule } from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportMapModule} from "../airportMap/airportMap.module";

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
            AirportMapModule
            ],
  declarations: [AdminPanelComponent],
  exports: [AdminPanelComponent],
  providers: [NameListService,
              FlightLoadService]
})
export class AdminPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: AdminPanelModule,
      providers: [NameListService]
    };
  }
}

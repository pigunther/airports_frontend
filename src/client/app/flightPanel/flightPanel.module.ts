import {ModuleWithProviders, NgModule} from '@angular/core';
import { FlightPanelComponent } from './flightPanel.component';
import { FlightPanelRoutingModule } from './flightPanel-routing.module';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import { PanelModule, ToolbarModule, ButtonModule, TooltipModule, CalendarModule, AutoCompleteModule, SliderModule } from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";

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
            SliderModule
            ],
  declarations: [FlightPanelComponent],
  exports: [FlightPanelComponent],
  providers: [NameListService]
})
export class FlightPanelModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightPanelModule,
      providers: [NameListService]
    };
  }
}
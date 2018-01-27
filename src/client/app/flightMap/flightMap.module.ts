import {ModuleWithProviders, NgModule} from '@angular/core';
import { SharedModule } from '../shared/shared.module';
import { NameListService } from '../shared/name-list/name-list.service';
import {
  PanelModule, ToolbarModule, ButtonModule, TooltipModule, AutoCompleteModule, SliderModule,
  DialogModule, GMapModule, CheckboxModule, GrowlModule
} from 'primeng/primeng';
import {FormsModule} from "@angular/forms";
import {RouterModule} from "@angular/router";
import {CommonModule} from "@angular/common";
import {FlightMapComponent} from "./flightMap.component";

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
            AutoCompleteModule,
            SliderModule,
            GMapModule,
            DialogModule,
            GrowlModule,
            CheckboxModule
            ],
  declarations: [FlightMapComponent],
  exports: [FlightMapComponent],
  providers: [NameListService]
})
export class FlightMapModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: FlightMapModule,
      providers: [NameListService]
    };
  }
}

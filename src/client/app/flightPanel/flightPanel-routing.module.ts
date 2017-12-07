import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FlightPanelComponent } from './flightPanel.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'flightPanel', component: FlightPanelComponent }
    ])
  ],
  exports: [RouterModule]
})
export class FlightPanelRoutingModule { }

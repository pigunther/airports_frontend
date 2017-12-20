import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AirportMapComponent } from './airportMap.component';

@NgModule({
  imports: [
    RouterModule.forChild([
      { path: 'airportMap', component: AirportMapComponent }
    ])
  ],
  exports: [RouterModule]
})
export class AirportMapRoutingModule { }

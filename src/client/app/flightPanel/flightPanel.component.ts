import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-airportMap',
  templateUrl: 'flightPanel.component.html',
  styleUrls: ['flightPanel.component.css'],
})
export class FlightPanelComponent {

  flights: FlightModel[];
  price: number;
  tabIndex: number;

  flightQuery = new FlightModel();

  constructor (
    private flightService: FlightLoadService
  ) {};

  search(): void {

    console.log(this.flightQuery);
    this.flightService.getTotalJson().then((f)=> {
    //this.flightService.getJsonByStringQuery(this.flightQuery).then((f)=>  {
      this.flights = f;
      for (let flighti of this.flights) {
               flighti.departureTime = new Date(flighti.departureTime);
               flighti.arrivalTime = new Date(flighti.arrivalTime);
               console.log(flighti);
      }
    });

    console.log(this.flights);
  }

  /*
  TODO
  добавить подсказки к поиску города
   */
}

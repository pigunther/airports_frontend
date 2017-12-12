import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightPanel',
  templateUrl: 'flightPanel.component.html',
  styleUrls: ['flightPanel.component.css'],
})
export class FlightPanelComponent {

  flights: FlightModel[];
  result = 'empty';
  price: number;

  flightQuery = new FlightModel();

  private JSONUrl = '/assets/flights.json';
  constructor (private http: HttpClient) {};
  search() {
    this.flights = null;
    this.result = `${this.flightQuery.airportFromObject.cityName} ${this.flightQuery.airportToObject.cityName} ${this.flightQuery.departureTime} ${this.flightQuery.arrivalTime} ${this.flightQuery.cost}`;

    console.log('button click');
    console.log(this.flightQuery.departureTime.toDateString());

    this.http.get(this.JSONUrl).subscribe((data: FlightModel[]) => {
    //this.http.get(this.JSONUrl).toPromise().then((data: FlightModel[]) => {
      // Read the result field from the JSON response.

      this.flights = data;
      for (let flighti of this.flights) {
        flighti.departureTime = new Date(flighti.departureTime);
        flighti.arrivalTime = new Date(flighti.arrivalTime);
        console.log(flighti);
      }
    });
  /*
  TODO
  добавить подсказки к поиску города
   */

  }

}

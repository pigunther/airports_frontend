import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flightModel } from '../components/models/flightModel';



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightPanel',
  templateUrl: 'flightPanel.component.html',
  styleUrls: ['flightPanel.component.css'],
})
export class FlightPanelComponent {

  flights: flightModel[];
  result = 'empty';
  price: number;

  flightQuery = new flightModel();

  private JSONUrl = '/assets/flights.json';
  constructor (private http: HttpClient) {};
  search() {
    this.flights = null;
    this.result = `${this.flightQuery.airportFromObject.cityName} ${this.flightQuery.airportToObject.cityName} ${this.flightQuery.departureTime} ${this.flightQuery.arrivalTime} ${this.flightQuery.cost}`;

    console.log('button click');
    console.log(this.flightQuery.departureTime.toDateString());

    this.http.get(this.JSONUrl).subscribe((data: flightModel[]) => {
    //this.http.get(this.JSONUrl).toPromise().then((data: flightModel[]) => {
      // Read the result field from the JSON response.

      this.flights = data;
      for (let i = 0; i < this.flights.length; i++) {
        //this.flights[i];
        this.flights[i].departureTime = new Date(this.flights[i].departureTime.valueOf());
        this.flights[i].arrivalTime = new Date(this.flights[i].arrivalTime.valueOf());
        console.log(this.flights[i]);
      }
    });
  /*

  TODO
  добавить подсказки к поиску города
  p-slider?


   */

  }
}

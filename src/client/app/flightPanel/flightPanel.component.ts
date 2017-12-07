import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { flightModel } from '../components/models/flightModel';



@Component({
  moduleId: module.id,
  selector: 'sd-flightPanel',
  templateUrl: 'flightPanel.component.html',
  styleUrls: ['flightPanel.component.css'],
})
export class FlightPanelComponent {

  flights: flightModel[];
  result = 'empty';
  price = -1;

  flightQuery = new flightModel();

  private JSONUrl = '/assets/flights-copy.json';
  constructor (private http: HttpClient) {};
  search() {
    this.flights = null;
    this.result = `${this.flightQuery.cityFrom} ${this.flightQuery.cityTo} ${this.flightQuery.departureDate} ${this.flightQuery.arrivalDate} ${this.flightQuery.price}`;

    console.log('button click');
    console.log(this.flightQuery.departureDate.toDateString());

    // this.http.get(this.JSONUrl).subscribe((data: flightModel[]) => {
    //   // Read the result field from the JSON response.
    //
    //   this.flights = data;
    //   for (let i = 0; i < this.flights.length; i++) {
    //     //this.flights[i];
    //     this.flights[i].departureDate = new Date(1000*this.flights[i].departureDate.valueOf());
    //     this.flights[i].arrivalDate = new Date(1000*this.flights[i].arrivalDate.valueOf());
    //     console.log(this.flights[i]);
    //   }
    // });

    this.httpGet(this.JSONUrl)
      .then((response: string) => {
        this.flights = JSON.parse(response);
        for (let i = 0; i < this.flights.length; i++) {
          //this.flights[i];
          this.flights[i].departureDate = new Date(1000*this.flights[i].departureDate.valueOf());
          this.flights[i].arrivalDate = new Date(1000*this.flights[i].arrivalDate.valueOf());
          console.log(this.flights[i]);
        }
        return this.flights;
      })
      .catch(error => {
        alert(error);
      })

  }

  //return promise for get query
  httpGet(url: string) {
    return new Promise(function(resolve, reject) {

      let xhr = new XMLHttpRequest();
      xhr.open('GET', url, true);

      xhr.onload = function() {
        if (this.status == 200) {
          resolve(this.response);
        } else {
          let error = new Error(this.statusText);
          reject(error);
        }
      };

      xhr.onerror = function() {
        reject(new Error("Network Error"));
      };

      xhr.send();
    });
  }

}

import {Component, Input, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightComplexOffer',
  templateUrl: 'flightComplexOffer.component.html',
  styleUrls: [ 'flightComplexOffer.component.css'],

})
export class FlightComplexOfferComponent {
  @Input() flights: FlightModel[];
  flight = new FlightModel();
  textTransfer : string;
  length: number;
  transferFlag = false;

  ngOnInit() {


    console.log(this.flights);
    this.length = this.flights.length;

    this.flight.airportFromObject = this.flights[0].airportFromObject;
    this.flight.airportToObject = this.flights[this.length-1].airportToObject;
    this.flight.departureTime = this.flights[0].departureTime;
    this.flight.arrivalTime = this.flights[this.length-1].arrivalTime;
    this.flight.cost = this.flights.reduce(function(cost, f) {
      return cost+f.cost;
    }, 0);
    this.flight.id = this.flights[0].id;
    this.flight.alwayslate = this.flights.some((f) => {
      return (f.alwayslate === true);
    });
    this.flight.freePlace = this.flights.reduce(function(min:number, f) {
      return (min < f.freePlace)? min : f.freePlace;
    }, 100000000);
    this.flight.airline = this.flights[0].airline;

    if (this.flights.length === 1) {
      this.textTransfer = 'Без пересадок';
    } else if (this.flights.length === 2) {
      this.textTransfer = '1 пересадка';
    } else {
      this.textTransfer = '2 пересадки';
    }
  }

  transferBtn() {
    if (this.textTransfer !== 'Без пересадок')
      this.transferFlag = !this.transferFlag;
  }

  timeCounter(flight: FlightModel): string {
    let time = new Date(flight.arrivalTime - flight.departureTime);
    let hours = Math.floor(time/24/60/60/60);
    let minutes = Math.floor((time - hours*24*60*60*60)/24/60/60);
    return hours + 'ч '+ minutes;
  }

  lateFunction(el: any) {
    return (el===true)? 'частые' : 'нет';
  }

}

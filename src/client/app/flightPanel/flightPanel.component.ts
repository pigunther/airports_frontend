import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityModel} from "../components/models/CityModel";



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightPanel',
  templateUrl: 'flightPanel.component.html',
  styleUrls: ['flightPanel.component.css'],
})
export class FlightPanelComponent {

  flights: FlightModel[];
  flightsArray: FlightModel[][];
  price: number;
  tabIndex: number;
  tipCities: string[];

  selectTransfer: string = 'no';

  flightQuery = new FlightModel();

  constructor (
    private flightService: FlightLoadService,
    private airportCitiesService: AirportCitiesService
  ) {};


  search(): void {
    console.log(this.flightQuery);
    //this.flightService.getTotalJson().then((f)=> {
    this.flightService.getFlights(this.flightQuery).then((f)=>  {
      this.flights = f;
      for (let flighti of this.flights) {
               flighti.departureTime = new Date(flighti.departureTime);
               flighti.arrivalTime = new Date(flighti.arrivalTime);
               //flighti.airportFrom = this.airportCitiesService.getAirportByName(flighti.airportFrom);
               console.log(flighti);
      }
    });
    console.log('these are flights:');
    console.log(this.flights);
  }

  searchComplex() {

    if (this.selectTransfer === 'yes') {
      console.log('ищем с пересадками');
      //this.flightService.getTotalJson().then((f)=> {
      this.flightService.getComplexFlights(this.flightQuery).then((flightsArray) => {
        this.flightsArray = flightsArray;
        for (this.flights of flightsArray) {
          for (let flighti of this.flights) {
            flighti.departureTime = new Date(flighti.departureTime);
            flighti.arrivalTime = new Date(flighti.arrivalTime);
            console.log(flighti);
          }
        }

      });
    } else {
      console.log('ищем без пересадок');
      this.flightService.getFlights(this.flightQuery).then((flights) => {
        //this.flightsArray = [flights];
        this.flightsArray = [];
        //for (this.flight of flights) {
          for (let flighti of flights) {
            this.flightsArray.push([flighti]);
            flighti.departureTime = new Date(flighti.departureTime);
            flighti.arrivalTime = new Date(flighti.arrivalTime);
            console.log(flighti);
          }
        // }
        console.log(this.flightsArray);
        console.log('массив билетов')

      });
    }

  }

  cityTip(event: any) {
   this.airportCitiesService.getCities().then((c) => {
     this.tipCities = this.airportCitiesService.filterCityForTips(c, event.query);
   })
  }

}

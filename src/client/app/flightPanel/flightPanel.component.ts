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
  price: number;
  tabIndex: number;
  tipCities: string[];

  flightQuery = new FlightModel();

  constructor (
    private flightService: FlightLoadService,
    private airportCitiesService: AirportCitiesService
  ) {};

  ngOnInit(){
    this.search();
  }

  search(): void {

    console.log(this.flightQuery);
    this.flightService.getTotalJson().then((f)=> {
    //this.flightService.getJsonByStringQuery(this.flightQuery).then((f)=>  {
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

  cityTip(event: any) {
   this.airportCitiesService.getCities().then((c) => {
     this.tipCities = this.airportCitiesService.filterCityForTips(c, event.query);
   })
  }

}

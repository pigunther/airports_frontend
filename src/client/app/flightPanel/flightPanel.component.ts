import {Component, ViewEncapsulation} from '@angular/core';
import {FlightModel} from '../components/models/FlightModel';
import {FlightLoadService} from '../services/FlightLoad.service';
import {AirportCitiesService} from '../services/AirportCities.service';
import {PropertyHandler} from '../utils/property-handler';


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
  // tipCities2: string[];

  @PropertyHandler({
    afterChange() {
      this.searchComplex();
    }
  }) selectTransfer: string = 'no';

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

    if (this.flightQuery && this.flightQuery.airportFromObject.cityName && this.flightQuery.airportToObject.cityName && this.flightQuery.airportToObject.cityName !== this.flightQuery.airportFromObject.cityName) {
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

        }).catch((err) => {console.log(err)});
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
          //console.log(this.flightsArray);
          //console.log('массив билетов')
        }).catch((err) => {
          this.flightsArray = [];
          console.log(err)});
      }

    }
  }

  cityTip(event: any) {
    this.airportCitiesService.getCities().then((c) => {
      this.tipCities = this.airportCitiesService.filterCityForTips(c, event.query);
    })
  }
  //
  // cityTip2(event: any) {
  //   this.airportCitiesService.getCities().then((c) => {
  //     this.tipCities2 = this.airportCitiesService.filterCityForTips(c, event.query);
  //   })
  // }

  handleSliderEvent(event: any) {
    console.log(event);
  }

  //todo запретить два города одинаковых
  //todo поиск по enter
}

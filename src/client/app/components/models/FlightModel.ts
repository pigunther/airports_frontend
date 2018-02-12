import {AirportModel} from "./AirportModel";
import {CityModel} from "./CityModel";

export class FlightModel {
  departureTime: Date;
  arrivalTime: Date;
  // cityFrom: CityModel;
  // cityTo: CityModel;
  cost: number;
  id: number;
  airline: string;
  alwaysLate: boolean;
  freePlace: number;

  airportFromObject: AirportModel;
  airportToObject: AirportModel;

  constructor () {
    this.departureTime=new Date();
    this.cost = 100000;
    this.airportFromObject = new AirportModel();
    this.airportToObject = new AirportModel();
  }


}

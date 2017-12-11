import {AirportModel} from "./AirportModel";

export class FlightModel {
  departureTime: Date;
  arrivalTime: Date;
  cityFrom: string;
  cityTo: string;
  cost: number;
  id: number;
  airline: string;
  alwayslate: boolean;
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

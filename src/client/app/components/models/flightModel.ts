import {airportModel} from "./airportModel";

export class flightModel {
  departureTime: Date;
  arrivalTime: Date;
  cityFrom: string;
  cityTo: string;
  cost: number;
  id: number;
  airoportFromId: number;
  airoportToId: number;
  airline: string;
  alwayslate: boolean;
  freePlace: number;

  airportFromObject: airportModel;
  airportToObject: airportModel;

  constructor () {
    this.departureTime=new Date();
    this.cost = 100000;
    this.airportFromObject = new airportModel();
    this.airportToObject = new airportModel();
  }


}

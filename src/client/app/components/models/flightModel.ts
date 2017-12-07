export class flightModel {
  departureDate: Date;
  arrivalDate: Date;
  cityFrom: string;
  cityTo: string;
  airportTo: string;
  airportFrom: string;
  price: number;

  constructor () {
    this.departureDate=new Date();
    this.price = 100000;
  }

}

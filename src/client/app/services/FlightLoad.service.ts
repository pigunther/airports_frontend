import {Injectable} from "@angular/core";
import {FlightModel} from "../components/models/FlightModel";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class FlightLoadService {

  constructor(private http: HttpClient) {}

  private JSONUrl = '/assets/flights.json';
  private result = '';
  //private BaseUrl = 'http://localhost:5555';
  //private BaseUrl = 'http://localhost:1234';
  private BaseUrl = 'http://80.93.177.22:1234';

  getFlightsTmp(flightQuery: FlightModel) : Promise<FlightModel[]>{
    return this.http.get('http://localhost:5555'+this.JSONUrl).toPromise().
              then(response => response as FlightModel[]);
  }

  getFlights(flightQuery: FlightModel): Promise<FlightModel[]> {

    //this.result = `/api/search?cityFrom=${flightQuery.cityFrom}&cityTo=${flightQuery.cityTo}&date=${flightQuery.departureTime.valueOf()}&cost=${flightQuery.cost}`;
    // this.result = `/api/search?cityFrom=${flightQuery.airportFrom.cityName}&cityTo=${flightQuery.airportTo.cityName}&date=1970-01-01 06:21:00&cost=${flightQuery.cost}`;
   //this.result = `/api/search?cityFrom=${flightQuery.airportFromObject.cityName}&cityTo=${flightQuery.airportToObject.cityName}&date=1970-01-01 00:00:00&cost=${flightQuery.cost}`;
    this.result = `/api/search?cityFrom=${flightQuery.airportFromObject.cityName}&cityTo=${flightQuery.airportToObject.cityName}&date=${this.dateStringFormat(flightQuery.departureTime)}&cost=${flightQuery.cost}`;

    //console.log(this.result);

    return this.http.get(this.BaseUrl + this.result).toPromise().
              then(response => response as FlightModel[]);

  }

  getComplexFlights(flightQuery: FlightModel) : Promise<FlightModel[][]> {
    this.result = `/api/search/complex?cityFrom=${flightQuery.airportFromObject.cityName}&cityTo=${flightQuery.airportToObject.cityName}&date=${this.dateStringFormat(flightQuery.departureTime)}&cost=${flightQuery.cost}`;
    //this.result = '/assets/complexFlights.json';
    //console.log(this.result);

    //return this.http.get('http://localhost:5555' + this.result).toPromise().
    return this.http.get(this.BaseUrl+this.result).toPromise().
    then(response => response as Array<FlightModel[]>);

  }

  dateStringFormat(date: Date): string {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2)
      +' '+'00:00:00';
  }
}

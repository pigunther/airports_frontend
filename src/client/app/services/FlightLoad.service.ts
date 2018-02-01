import {Injectable} from "@angular/core";
import {FlightModel} from "../components/models/FlightModel";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class FlightLoadService {

  constructor(private http: HttpClient) {}

  private JSONUrl = '/assets/flights.json';
  private result = '';
  //private BaseUrl = 'http://80.93.177.22:8080';
  private BaseUrl = 'http://80.93.177.22:1234';
  //private BaseUrl = 'http://localhost:5555';

  getTotalJson() : Promise<FlightModel[]>{
    return this.http.get('http://localhost:5555'+this.JSONUrl).toPromise().
              then(response => response as FlightModel[]);
  }

  getJsonByStringQuery(flightQuery: FlightModel): Promise<FlightModel[]> {

    //this.result = `/api/search?cityFrom=${flightQuery.cityFrom}&cityTo=${flightQuery.cityTo}&date=${flightQuery.departureTime.valueOf()}&cost=${flightQuery.cost}`;
    this.result = `/api/search?cityFrom=${flightQuery.airportFromObject.cityName}&cityTo=${flightQuery.airportToObject.cityName}&date=2017-12-12 1200:12:12&cost=${flightQuery.cost}`;

    return this.http.get(this.BaseUrl + this.result).toPromise().
              then(response => response as FlightModel[]);

  }


}

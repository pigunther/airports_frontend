import {Injectable} from "@angular/core";
import {FlightModel} from "../components/models/FlightModel";
import {HttpClient} from "@angular/common/http";

@Injectable()
export  class FlightLoadService {

  constructor(private http: HttpClient) {}

  private JSONUrl = '/assets/flights.json';
  private result = '';
  //private BaseUrl = 'http://80.93.177.22:8080';
  //private BaseUrl = 'http://80.93.177.22:1234';
  //private BaseUrl = 'http://localhost:5555';
  private BaseUrl = 'http://localhost:1234';

  getTotalJson() : Promise<FlightModel[]>{
    return this.http.get('http://localhost:5555'+this.JSONUrl).toPromise().
              then(response => response as FlightModel[]);
  }

  getJsonByStringQuery(flightQuery: FlightModel): Promise<FlightModel[]> {

    //this.result = `/api/search?cityFrom=${flightQuery.cityFrom}&cityTo=${flightQuery.cityTo}&date=${flightQuery.departureTime.valueOf()}&cost=${flightQuery.cost}`;
    // this.result = `/api/search?cityFrom=${flightQuery.airportFrom.cityName}&cityTo=${flightQuery.airportTo.cityName}&date=1970-01-01 06:21:00&cost=${flightQuery.cost}`;
    this.result = 'api/search?cityFrom=Белорецк&cityTo=Якутск&date=1970-01-01 00:00:00&cost=10000000';



    return this.http.get('http://localhost:1234/api/search?cityFrom=Санкт-Петербург&cityTo=Томск&date=1970-01-01 00:00:00&cost=10000000').toPromise().
              then(response => response as FlightModel[]);

  }


}

import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {AirportModel} from "../components/models/AirportModel";
import {parallel} from "async";

@Injectable()
export class AirportCitiesService {


  constructor(private http: HttpClient) {}

  private JSONUrl = '/assets/flights.json';
  private result = '';
  //private BaseUrl = 'http://80.93.177.22:8080';
  private BaseUrl = 'http://80.93.177.22:1234';
  //private BaseUrl = 'http://localhost:5555';

  private cities: Promise<string[]> = new Promise((resolve, reject) => {
    resolve(["Moscow", "Madagaskar", "M", "ma", "Mq", "Mo", "Moo"]);

  });

  addAirport(airport: AirportModel) {
    console.log("Add airport");
    this.result=`/api/airport/new?name=${airport.name}&cityName=${airport.cityName}&parallel=${airport.parallel}&meridian=${airport.meridian}`;


    return this.http.post(this.BaseUrl+'/api/airport/new', airport).subscribe();
    // {
    //   name: airport.name,
    //     cityName: airport.cityName,
    //   parallel: airport.parallel,
    //   meridian: airport.meridian
    // }
  }


  getCities(): Promise<string[]> {

    return this.http.get(this.BaseUrl+'/getCities').toPromise().
    then(response => response as string[]);

  }

  getCitiesTMP(): Promise<string[]> {
    return this.cities;
  }

  addCity(cityName: string) {
    //кажется такой url нет todo - нормально написать это
    return this.http.post(this.BaseUrl+'/api/city/new', cityName).subscribe();
  }

  addCityTMP(cityName: string) {
    let tmpCities: string[] = [];
    this.cities.then((c) => {
      tmpCities = c;
      tmpCities.push(cityName);
      console.log("c: ", c);
      console.log("tmpin: ", tmpCities);
      this.cities = new Promise((resolve, reject) => {
        resolve(tmpCities);
      })
    });

  }

  postData() {
    this.http.post("", {});
  }
}

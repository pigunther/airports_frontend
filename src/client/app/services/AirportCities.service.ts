import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Http, Response} from "@angular/http";
import {AirportModel} from "../components/models/AirportModel";
import {parallel} from "async";
import {CityModel} from "../components/models/CityModel";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AirportCitiesService {


  constructor(private http: HttpClient) {}

  private static handleError(error: any): Promise<any> {
    console.error('HandleError: An error occured', error);
    return Promise.reject(error.message || error);
  };

  private JSONUrl = '/assets/flights.json';
  private result = '';
  //private BaseUrl = 'http://80.93.177.22:8080';
  //private BaseUrl = 'http://80.93.177.22:1234';
  private BaseUrl = 'http://localhost:8080';

  //private BaseUrl = 'http://localhost:5555';

  private cities: Promise<string[]> = new Promise((resolve, reject) => {
    resolve(["Moscow", "Madagaskar", "M", "ma", "Mq", "Mo", "Moo"]);

  });

  addAirport(airport: AirportModel) {
    console.log("Add airport");
    console.log('Оптравляем http.post на добавление аэропорта ' + airport.name + ', ' + airport.cityName);
    return this.http.post( this.BaseUrl+'/api/airport',
      {
        "name": airport.name,
        "parallel": airport.parallel,
        "meridian": airport.meridian,
        "cityName": airport.cityName
      },
      {headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),responseType: 'text'})
      .toPromise()
      //.then(()=> null)
      .catch(AirportCitiesService.handleError);

  }

  getAllAirports() {
    return this.http.get(this.BaseUrl + "/api/airport/").toPromise().
    then(response => response as AirportModel[]);
  }

  updateAirport(airport: AirportModel) {
    return this.http.put(this.BaseUrl+'/api/airport/'+airport.id.toString(), airport)
      .toPromise()
      //.then(()=>null)
      .catch(AirportCitiesService.handleError);

  }

  deleteAirport(airport: AirportModel) {
    console.log('Отправляем http.request на удаление аэропорта '+airport.name);
    return this.http.request('delete', this.BaseUrl+'/api/airport',{body: airport.name, responseType: 'text'})
      .toPromise()
      //.then(() => null)
      .catch(AirportCitiesService.handleError);
  }

  getCities(): Promise<CityModel[]> {

    return this.http.get(this.BaseUrl+'/getCities').toPromise().
    then(response => response as CityModel[]);

  }

  getCitiesTMP(): Promise<string[]> {
    return this.cities;
  }

  addCity(cityName: string): Promise<void> {
    console.log('Отправляем http.post на добавление города ' + cityName);
     return this.http.post(this.BaseUrl+'/api/city', cityName, {responseType: 'text'})
       .toPromise()
       //.then(() => null)
       .catch(AirportCitiesService.handleError);
  }

  deleteCity(cityName: string) {
    console.log('Отпрвляем http.delete на удаление '+cityName);
    return this.http.request('delete', this.BaseUrl+'/api/city', {body: cityName, responseType: 'text'})
      .toPromise()
      //.then(() => null)
      .catch(AirportCitiesService.handleError);
  }

  addCityTMP(cityName: string) {
    let tmpCities: string[] = [];
    this.cities.then((c) => {
      tmpCities = c;
      tmpCities.push(cityName);
      console.log("c: ", c);
      console.log("tmpin: ", tmpCities);
      this.cities  = new Promise((resolve, reject) => {
        resolve(tmpCities);
      })
    });

  }

  postData() {
    this.http.post("", {});
  }


  filterCityForTips(allCities: CityModel[], query: string) : string[] {
    let foundCities: string[] = [];
    // allCities.filter( (tmpCity) =>
    //   tmpCity.name.search(new RegExp(query, "i")) == 0
    //     // console.log(tmpCity.name);
    //     // foundCities.push(tmpCity.name);
    // );


    allCities.forEach(function (tmpCity) {

      if (tmpCity.name.search(new RegExp(query, "i")) == 0) {
        console.log(tmpCity.name);
        foundCities.push(tmpCity.name);
      }
    });
    return foundCities;
  }


  getAirportByName(allAirports: AirportModel[], name: string) : AirportModel {
    for (let airport of allAirports) {
      if (airport.name === name)
        return airport;
    }
    return null;
  }

  checkCityByName(cityName: string) {
    console.log('Проверяем город ' + cityName);
    this.getCities().then((allCities) => {
      console.log('filtered:' + allCities.filter((city)=> city.name === cityName) + '|');
      console.log( allCities.filter((city)=> city.name === cityName));
      console.log( allCities.filter((city)=> city.name === cityName).length);

      if (allCities.filter((city)=> city.name === cityName).length === 0) {
        console.log('Не найден город ' + cityName);
        return false;
      }
      return true;
    });
  }
}

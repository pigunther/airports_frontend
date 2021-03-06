import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Http, Response} from "@angular/http";
import {AirportModel} from "../components/models/AirportModel";
import {parallel} from "async";
import {CityModel} from "../components/models/CityModel";
import "rxjs/add/operator/toPromise";

@Injectable()
export class AirportCitiesService {


  constructor(public http: HttpClient) {}

  private static handleError(error: any): Promise<any> {
    console.error('HandleError: An error occured', error);
    return Promise.reject(error.message || error);
  };

  private JSONUrl = '/assets/flights.json';
  private result = '';

  //private BaseUrl = 'http://localhost:1234';
  private BaseUrl = 'http://80.93.177.22:1234';

  private cities: Promise<CityModel[]>;


  addAirport(airport: AirportModel) {
    console.log("Add airport");
    console.log('Оптравляем http.post на добавление аэропорта ' + airport.name + ', ' + airport.cityName);
    return this.http.post( this.BaseUrl+'/api/airport',
      {
        "name": airport.name,
        "parallel": airport.parallel,
        "meridian": airport.meridian,
        "city": {
          "name" : airport.city.name
        }
      },
      {headers: new HttpHeaders({
        'Content-Type': 'application/json'
      }),responseType: 'text'})
      .toPromise()
      .catch(AirportCitiesService.handleError);

  }

  getAllAirports() {
    return this.http.get(this.BaseUrl + "/api/airport/").toPromise().
    then(response => response as AirportModel[]);
  }

  updateAirport(airport: AirportModel) {
    return this.http.put(this.BaseUrl+'/api/airport/'+airport.id.toString(), {
      "name": airport.name,
      "parallel": airport.parallel,
      "meridian": airport.meridian,
      "city": {
        "name" : airport.city.name
      }}, {headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }),responseType: 'text'})
      .toPromise()
      .catch(AirportCitiesService.handleError);

  }

  deleteAirport(airport: AirportModel) {
    console.log('Отправляем http.request на удаление аэропорта '+airport.name);
    return this.http.request('delete', this.BaseUrl+'/api/airport',{body:
      {
        "name": airport.name,
        "parallel": airport.parallel,
        "meridian": airport.meridian,
        "city": {
          "name" : airport.city.name
      }}, headers: new HttpHeaders({
      'Content-Type': 'application/json'
    }), responseType: 'text'})
      .toPromise()
      .catch(AirportCitiesService.handleError);
  }

  getCities(): Promise<CityModel[]> {
    if (!this.cities) {
      this.cities = this.http.get(this.BaseUrl+'/api/getCities').toPromise().
      then(response => response as CityModel[]);
    }
    return this.cities;
  }

  addCity(cityName: string): Promise<void> {
    this.cities = null;
    console.log('Отправляем http.post на добавление города ' + cityName);
     return this.http.post(this.BaseUrl+'/api/city', cityName, {responseType: 'text'})
       .toPromise()
       .catch(AirportCitiesService.handleError);
  }

  deleteCity(cityName: string) {
    this.cities = null;
    console.log('Отпрвляем http.delete на удаление '+cityName);
    return this.http.request('delete', this.BaseUrl+'/api/city', {body: cityName, responseType: 'text'})
      .toPromise()
      .catch(AirportCitiesService.handleError);
  }


  postData() {
    this.http.post("", {});
  }


  filterCityForTips(allCities: CityModel[], query: string) : string[] {
    let foundCities: string[] = [];


    allCities.forEach(function (tmpCity) {

      if (tmpCity.name.search(new RegExp(query, "i")) == 0) {
        //console.log(tmpCity.name);
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

  checkCityByName(cityName: string) : Promise<boolean>
  {
    return this.getCities().then((allCities) => {
      //console.log('filtered:' + allCities.filter((city)=> city.name === cityName) + '|');
      //console.log( allCities.filter((city)=> city.name === cityName));
      //console.log( allCities.filter((city)=> city.name === cityName).length);

      if (allCities.filter((city)=> city.name === cityName).length === 0) {
        //console.log('Не найден город ' + cityName);
        return false;
      }
      return true;
    })
  }
}

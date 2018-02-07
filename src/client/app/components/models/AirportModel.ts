import {CityModel} from "./CityModel";

export  class AirportModel {
  id: number;
  name: string;
  cityId: number;
  parallel: number;
  meridian: number;
  cityName: string;
  city: CityModel;


  set(name: string, cityName:string, parallel:number, meridian:number) {
    this.name = name;
    this.city = new CityModel(cityName);
    this.cityName = cityName;
    this.parallel = parallel;
    this.meridian = meridian;
  }

  setCity(cityName: string) {
    this.city = new CityModel(cityName);
    this.cityName = cityName;
  }

}


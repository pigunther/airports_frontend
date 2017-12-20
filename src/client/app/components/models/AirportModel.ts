export  class AirportModel {
  id: number;
  name: string;
  cityId: number;
  parallel: number;
  meridian: number;
  cityName: string;

  constructor(name: string, cityName:string, parallel:number, meridian:number) {
    this.name = name;
    this.cityName = cityName;
    this.parallel = parallel;
    this.meridian = meridian;
  }

}


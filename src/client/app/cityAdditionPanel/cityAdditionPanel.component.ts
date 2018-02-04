import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityModel} from "../components/models/CityModel";



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-cityAddition',
  templateUrl: 'cityAdditionPanel.component.html',
  // styleUrls: ['adminPanel.component.css'],
})
export class CityAdditionPanelComponent {


  cityName: string;

  cities: CityModel[] = [];

  blockSpecial: RegExp = /(^[^<>*!./,]*$)/;

  constructor (
    private airportCitiesService: AirportCitiesService
  ) {};

  ngOnInit() {
    this.getCities();
  }



  getCities() {
    this.airportCitiesService.getCities().then((c) => {
      this.cities = c;
    });
  }

  addCity(): boolean {
    if (this.cityName) {
      this.airportCitiesService.addCity(this.cityName).then(() =>{
        this.getCities();
      });

      this.cityName = '';
    }
    return false;
  }

  deleteCity(event: any) {
    console.log(event.target.innerHTML);
    this.airportCitiesService.deleteCity(event.target.innerHTML).then(() => {
      console.log("--------------")
      this.getCities();
    });

  }
}
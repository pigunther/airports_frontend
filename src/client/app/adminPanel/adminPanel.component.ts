import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-admin',
  templateUrl: 'adminPanel.component.html',
  // styleUrls: ['adminPanel.component.css'],
})
export class AdminPanelComponent {
//todo убрать TMP
  airportFlag: boolean;
  cityFlag: boolean;

  cityName: string;
  cities: string[] = [];

  blockSpecial: RegExp = /(^[^<>*!./,]*$)/;

  constructor (
    private airportCitiesService: AirportCitiesService
  ) {};

  ngOnInit() {
    this.airportCitiesService.getCitiesTMP().then((c) => {
      this.cities = c;
      }
    )

  }

  airport() {
    this.cityFlag = false;
    this.airportFlag = true;
  }

  city() {
    this.airportFlag = false;
    this.cityFlag = true;
  }

  addCity(): boolean {
    if (this.cityName) {
      this.airportCitiesService.addCityTMP(this.cityName);
      this.airportCitiesService.getCitiesTMP().then((c) => {
        this.cities = c;
      });
      this.cityName = '';
    }
    return false;
  }

}

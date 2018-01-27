import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-admin',
  templateUrl: 'adminPanel.component.html',
  // styleUrls: ['adminPanel.component.css'],
})
export class AdminPanelComponent {

  airportFlag: boolean;
  cityFlag: boolean;

  cityName: string;
  cities: string[] = [];

  constructor (
    private flightService: FlightLoadService
  ) {};

  ngOnInit() {
    //this.flightService.getCities().then((c) => {
    //  this.cities = c;
    //  }
    //)

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
    this.cities.push(this.cityName);
    this.cityName='';
    return false;
  }

}

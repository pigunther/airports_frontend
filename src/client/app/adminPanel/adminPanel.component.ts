import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityModel} from "../components/models/CityModel";



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

  airport() {
    this.cityFlag = false;
    this.airportFlag = true;
  }

  city() {
    this.airportFlag = false;
    this.cityFlag = true;
  }

}

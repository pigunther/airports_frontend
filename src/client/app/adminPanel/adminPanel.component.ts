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
  styleUrls: ['adminPanel.component.css', '../normalize.css']
})
export class AdminPanelComponent {
  index: number = 1;

  changeIndex() {
    this.index = 1-this.index;
  }
}

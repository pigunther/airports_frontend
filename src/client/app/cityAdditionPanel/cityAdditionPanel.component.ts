import {Component, Input, ViewEncapsulation} from '@angular/core';
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
  styleUrls: ['cityAdditionPanel.component.css'],
})
export class CityAdditionPanelComponent {

  @Input() changesCheck: number;

  cityName: string;

  cities: CityModel[] = [];

  blockSpecial: RegExp = /(^[^<>*!./,]*$)/;

  constructor (
    public airportCitiesService: AirportCitiesService
  ) {};

  ngOnInit() {
    this.getCities();
  }

  ngOnChanges() {
    this.getCities();
  }



  getCities() {
    this.airportCitiesService.getCities().then((c) => {
      this.cities = c;
    });
  }

  addCity(): boolean {
    if (this.cityName) {
      console.log('Добавляем город ' + this.cityName);
      this.airportCitiesService.addCity(this.cityName).then(() =>{
        this.getCities();
        console.log('--------')
      });

      this.cityName = '';
    }
    return false;
  }

  deleteCity(event: any) {
    // console.log(event);
    console.log('Удаляем город '+event.target.value);
    this.airportCitiesService.deleteCity(event.target.value).then(() => {
      this.getCities();
      console.log("--------------");
    });

  }
}

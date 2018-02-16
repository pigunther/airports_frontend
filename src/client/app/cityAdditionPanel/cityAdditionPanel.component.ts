import {Component, Input, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityModel} from "../components/models/CityModel";
import {ConfirmationService, Message} from 'primeng/api';



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
  display: boolean = false;


  blockSpecial: RegExp = /(^[^<>*!./,]*$)/;

  constructor (
    private airportCitiesService: AirportCitiesService,
    private confirmationService: ConfirmationService
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

  confirm(event: any) {
    this.display = true;
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete '+event.target.value,
      icon: 'fas fa-trash-alt',
      accept: () => {
        this.deleteCity(event);
        this.display = false;

        //Actual logic to perform a confirmation

      },
      reject: () => {
        this.display = false;
      }
    });
  }

  //todo добавить popup на подтверждение удаления. и несколько страничек (показать еще), и фильтрацию
}

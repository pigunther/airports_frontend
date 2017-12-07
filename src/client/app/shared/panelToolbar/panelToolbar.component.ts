import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/primeng';
import { SearchService } from '../../search.service';
import { Flight } from '../../Flight';
import { HttpClient } from '@angular/common/http';
//import * as http from "http";


export class SearchFlight {
  departureDate: Date;
  arrivalDate: Date;
  departureCity: string;
  arrivalCity: string;
}

@Component({
  moduleId: module.id,
  selector: 'sd-panel-toolbar',
  templateUrl: 'panelToolbar.component.html',
  styles: []
})
export class PanelToolbarComponent {
  items: MenuItem[];
  departureDate: Date;
  arrivalDate: Date;
  departureCity: string;
  arrivalCity: string;
  city: string;
  cities: string[] = [ 'Moscow', 'London', 'New-York', 'Tokio'];
  flights: Flight[];
  result = 'empty';

  private JSONUrl = 'file://home/natasha/workspace/js/angular-seed-master/src/client/app/shared/panelToolbar/flights.json';
  constructor (private http: HttpClient) {};
  //constructor(private service: SearchService) {}
  search() {
    this.result =  `${this.departureCity} ${this.arrivalCity} ${this.departureDate} ${this.arrivalDate}`;
    //this.service.getJSONString(this.result);
    //this.result = this.service.getJSONString('');
    console.log('button click');


    this.http.get('/api/flights.json').subscribe((data: any) => {
      // Read the result field from the JSON response.
      console.log(data['flights']);
    });
  }



}


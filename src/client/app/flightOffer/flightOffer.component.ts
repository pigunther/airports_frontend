import {Component, Input, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FlightModel } from '../components/models/FlightModel';



@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightOffer',
  templateUrl: 'flightOffer.component.html',
  styleUrls: ['flightOffer.component.css'],

})
export class FlightOfferComponent {
  @Input() flight: FlightModel;
}

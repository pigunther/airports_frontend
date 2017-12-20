import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Message} from "primeng/primeng";
import {AirportModel} from "../components/models/AirportModel";
import {FlightLoadService} from "../services/FlightLoad.service";

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-airportMap',
  templateUrl: 'airportMap.component.html',
  styleUrls: ['airportMap.component.css'],
})
export class AirportMapComponent {

  options: any;
  overlays: any[];
  dialogVisible: boolean;
  name: string;
  cityName: string;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean;
  msgs: Message[] = [];

  constructor (
    private flightService: FlightLoadService
  ) {};

  ngOnInit() {
    this.options = {
      center: {lat: 36.890257, lng: 30.707417},
      zoom: 12
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker) {
      let title = event.overlay.getTitle();
      this.infoWindow.setContent('' + title + '');
      this.infoWindow.open(event.map, event.overlay);
      event.map.setCenter(event.overlay.getPosition());

      this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});
    }
    else {
      this.msgs.push({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }

  addMarker() {
    if (this.name != undefined) {

      this.addAirport();

      this.overlays.push(new google.maps.Marker(
        { position:
          { lat: this.selectedPosition.lat(),
            lng: this.selectedPosition.lng()},
          title:this.name,
          draggable: this.draggable
        }));
      this.name = null;
      this.cityName = null;
      this.dialogVisible = false;
    }
  }

  addAirport() {
    //todo
    let airport = new AirportModel(this.name, this.cityName, this.selectedPosition.lat(), this.selectedPosition.lng());
    this.flightService.addAirport(airport);
    console.log(airport);
  }


  handleDragEnd(event: any) {
    this.msgs = [];
    this.msgs.push(
      { severity:'info',
        summary:'Marker Dragged',
        detail: event.overlay.getTitle()});
  }

  initOverlays() {
    if(!this.overlays||!this.overlays.length) {
      this.overlays = [];
    }
  }


  zoomIn(map: any) {
    map.setZoom(map.getZoom()+1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom()-1);
  }

  // clear() {
  //   this.overlays = [];
  // }
}


/*
TODO
create AdminPanel
add this and real city addition (by name) to AdminPanel



 */

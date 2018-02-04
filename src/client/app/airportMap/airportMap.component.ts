import {Component, ViewEncapsulation} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Message} from "primeng/primeng";
import {AirportModel} from "../components/models/AirportModel";
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";

declare const google: any;

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
  tipCities: string[];
  headerDialog: string;
  buttonDialog: string;

  constructor (
    private airportCitiesService: AirportCitiesService
  ) {};

  ngOnInit() {
    this.options = {
      center: {lat: 55.929613, lng: 37.519050},
      zoom: 5
    };

    if(!this.overlays||!this.overlays.length) {
      this.overlays = [];
    }

    this.infoWindow = new google.maps.InfoWindow();

    this.initOverlays();

  }

  handleMapClick(event: any) {
    this.headerDialog = "Новый аэропорт";
    this.buttonDialog = "Добавить аэропорт";
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker) {

      console.log(event.overlay.getTitle());
      console.log(event.overlay);
      let str = event.overlay.getTitle().toString();
      this.name = str.split(',')[0];
      this.headerDialog = "Изменение аэропорт";
      this.buttonDialog = "Изменить аэропорт";
      this.dialogVisible = true;

      this.airportCitiesService.getAllAirports().then((allAirports) => {

        let chosenAirport = this.airportCitiesService.getAirportByName(allAirports, this.name);
        console.log(chosenAirport);
        this.cityName = chosenAirport.cityName;
        this.selectedPosition = {
          lat() {return chosenAirport.parallel;},
          lng() {return chosenAirport.meridian;}
        };
        //this.selectedPosition.lat().set(chosenAirport.parallel);
        //this.selectedPosition.lng().set(chosenAirport.meridian);
        //todo update function
        let title = event.overlay.getTitle();
        this.infoWindow.setContent('' +title + '');
        this.infoWindow.open(event.map, event.overlay);
        event.map.setCenter(event.overlay.getPosition());

        this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});

      });

    }
    else {
      this.msgs.push({severity:'info', summary:'Shape Selected', detail: ''});
    }
  }

  addMarker() {

    if (this.name) {

      this.addAirport();
      console.log(this.selectedPosition.lat(), this.name);
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
    let airport = new AirportModel();
    airport.set(this.name, this.cityName, this.selectedPosition.lat(), this.selectedPosition.lng());
    this.airportCitiesService.addAirport(airport);
    console.log(airport);
  }

  cityTip(event: any) {
    this.airportCitiesService.getCities().then((c) => {
      this.tipCities = this.airportCitiesService.filterCityForTips(c, event.query);
    })
  }


  handleDragEnd(event: any) {
    this.msgs = [];
    this.msgs.push(
      { severity:'info',
        summary:'Marker Dragged',
        detail: event.overlay.getTitle()});
  }

  initOverlays() {

    this.airportCitiesService.getAllAirports().then((airports) => {
      for (let airport of airports) {
        //console.log(airport.parallel,  airport.meridian, airport.name);

        this.overlays.push(new google.maps.Marker(
          {
            position: { lat: airport.parallel, lng: airport.meridian},
            title:airport.name+', '+airport.cityName,
            draggable: false
          }))
      }
    });

  }


  zoomIn(map: any) {
    map.setZoom(map.getZoom()+1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom()-1);
  }
}


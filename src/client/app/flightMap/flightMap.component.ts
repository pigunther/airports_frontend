import {Component, Input, SimpleChanges, ViewEncapsulation} from '@angular/core';
import {Message} from "primeng/primeng";
import {FlightModel} from "../components/models/FlightModel";
import {AirportModel} from "../components/models/AirportModel";

declare const google: any;

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-flightMap',
  templateUrl: 'flightMap.component.html',
  styleUrls: ['flightMap.component.css'],

})
export class FlightMapComponent {

  options: any;
  overlays: any[];
  dialogVisible: boolean;
  name: string;
  cityName: string;
  selectedPosition: any;
  infoWindow: any;
  draggable: boolean;
  msgs: Message[] = [];
  marker: any = {
    url: '../assets/img/marker.png',
    size: new google.maps.Size(28, 39),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(11, 28)
  };

  @Input() flightsArray: FlightModel[][];

  ngOnInit() {
    this.options = {
      center: {lat: 55.929613, lng: 37.519050},
      zoom: 4
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();


    for (let flights of this.flightsArray) {
      this.addMarkerByAirport(flights[0].airportFromObject, flights[flights.length-1].airportToObject);
    }

    for (let flights of this.flightsArray) {
      for (let flight of flights) {
        this.addMarkerAndLineByAirport(flight.airportFromObject, flight.airportToObject);
      }
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log('--------- какие-то изменения на карте -----------')
    this.ngOnInit();
  }

  addMarkerAndLineByAirport(airportFrom: AirportModel, airportTo: AirportModel) {
    console.log(airportFrom);
    console.log(airportTo);

    let addFrom = new google.maps.Marker({
      position:
        {lat: airportFrom.parallel, lng: airportFrom.meridian},
      title: airportFrom.city.name + ", " + airportFrom.name,
      icon: this.marker
    });
    let addTo = new google.maps.Marker({
      position:
        {lat: airportTo.parallel, lng: airportTo.meridian},
      title: airportTo.city.name + ", " + airportTo.name,
      icon: this.marker
    });
    let findFrom = this.overlays.findIndex(find => find.title === addFrom.title);
    let findTo = this.overlays.findIndex(find => find.title === addTo.title);

    if (findFrom === -1) {
      this.overlays.push(addFrom);
      console.log('запушали откуда ');
    }
    if (findTo === -1) {
      this.overlays.push(addTo);
      console.log('запушали куда')
    }
    if (findFrom === -1 || findTo === -1 || this.overlays[findFrom].icon || this.overlays[findTo].icon) {
      let lineSymbol = {
        path: google.maps.SymbolPath.FORWARD_CLOSED_ARROW
      };
      this.overlays.push(
        new google.maps.Polyline({path: [{lat: airportFrom.parallel, lng: airportFrom.meridian},
          {lat: airportTo.parallel, lng: airportTo.meridian}],
          icons:[{
            icon: lineSymbol,
            offset: '50%'
          }],
          geodesic: true, strokeColor: '#0000FF', strokeOpacity: 0.5, strokeWeight: 2}),
      );
    }
  }


  addMarkerByAirport(airportFrom: AirportModel, airportTo: AirportModel) {
    console.log(airportFrom);
    console.log(airportTo);
    console.log('начальный и конечный маркеры ')
    let startMarker = {
      url: '../assets/img/startMarker.png',
      size: new google.maps.Size(28, 39),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(14, 39)
    };

    let finishMarker = {
      url: '../assets/img/finishMarker.png',
      size: new google.maps.Size(28, 39),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(14, 39)
    };

    let addFrom = new google.maps.Marker({
      position:
        {lat: airportFrom.parallel, lng: airportFrom.meridian},
      title: airportFrom.city.name + ", " + airportFrom.name,
      icon: startMarker
    });
    let addTo = new google.maps.Marker({
      position:
        {lat: airportTo.parallel, lng: airportTo.meridian},
      title: airportTo.city.name + ", " + airportTo.name,
      icon: finishMarker
    });

    let findFrom = this.overlays.findIndex(find => find.title === addFrom.title);
    let findTo = this.overlays.findIndex(find => find.title === addTo.title);

    if (findFrom === -1) {
      this.overlays.push(addFrom);
      console.log('запушали откуда начало');
    }
    if (findTo === -1) {
      this.overlays.push(addTo);
      console.log('запушали куда конец')
    }
  }

  handleMapClick(event: any) {
    this.dialogVisible = true;
    this.selectedPosition = event.latLng;
  }

  handleOverlayClick(event: any) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle != undefined;

    if(isMarker) {
      // let title = event.overlay.getTitle();
      // this.infoWindow.setContent('' + title + '');
      // this.infoWindow.open(event.map, event.overlay);
      // event.map.setCenter(event.overlay.getPosition());


      //this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});
    }
  }

  handleDragEnd(event: any) {
    this.msgs = [];
    this.msgs.push(
      { severity:'info',
        summary:'Marker Dragged',
        detail: event.overlay.getTitle()});
  }

  initOverlays() {
    if(!this.overlays||this.overlays.length) {
      this.overlays = [];
      console.log('обнулили слои -----------')
    }
  }


  zoomIn(map: any) {
    map.setZoom(map.getZoom()+1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom()-1);
  }


}

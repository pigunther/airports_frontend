import {Component, Input, ViewEncapsulation} from '@angular/core';
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

  flight: FlightModel;

  @Input() flights: FlightModel[];

  ngOnInit() {
    this.options = {
      center: {lat: 55.929613, lng: 37.519050},
      zoom: 4
    };

    this.initOverlays();

    this.infoWindow = new google.maps.InfoWindow();

    for (var i = 0; i < this.flights.length; i++) {
      this.flight = this.flights[i];
      console.log(this.flight);
      this.addMarkerByAirport(this.flight.airportFromObject, this.flight.airportToObject);
    }
  }

  addMarkerByAirport(airportFrom: AirportModel, airportTo: AirportModel) {
    var addFrom = new google.maps.Marker({position:
      {lat: airportFrom.parallel, lng: airportFrom.meridian},
      title: airportFrom.cityName + " " + airportFrom.name});
    var addTo = new google.maps.Marker({position:
      {lat: airportTo.parallel, lng: airportTo.meridian},
      title: airportTo.cityName + " " + airportTo.name});
    var findFrom = this.overlays.findIndex(find => find==addFrom);
    var findTo = this.overlays.findIndex(find => find==addFrom);

    if (findFrom === -1) {
      this.overlays.push(addFrom);
    }
    if (findTo === -1) {
      this.overlays.push(addTo);
    }
    if (findFrom === -1 || findTo === -1) {
      this.overlays.push(
        new google.maps.Polyline({path: [{lat: airportFrom.parallel, lng: airportFrom.meridian},
          {lat: airportTo.parallel, lng: airportTo.meridian}],
          geodesic: true, strokeColor: '#0000FF', strokeOpacity: 0.5, strokeWeight: 2}),
      );
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


}

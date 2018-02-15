import {Component, ViewEncapsulation, Input} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Message} from "primeng/primeng";
import {AirportModel} from "../components/models/AirportModel";
import {FlightLoadService} from "../services/FlightLoad.service";
import {AirportCitiesService} from "../services/AirportCities.service";
import {CityModel} from "../components/models/CityModel";

declare const google: any;

@Component({
  moduleId: module.id,
  encapsulation: ViewEncapsulation.None,
  selector: 'sd-airportMap',
  templateUrl: 'airportMap.component.html',
  styleUrls: ['airportMap.component.css'],
})
export class AirportMapComponent {

  @Input() changesCheck: number;

  options: any;
  overlays: any[];
  overlayForUpdate: any;
  dialogVisible: boolean;

  infoWindow: any;
  draggable: boolean;
  msgs: Message[] = [];
  tipCities: string[];
  headerDialog: string;
  buttonDialog: string;
  changeAirportString: string = 'Изменить аэропорт';

    airportForView: AirportModel = new AirportModel();

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

  ngOnChanges(){
    this.initOverlays();
  }

  handleMapClick(event: any) {
    this.headerDialog = "Новый аэропорт";
    this.buttonDialog = "Добавить аэропорт";
    this.dialogVisible = true;
    this.airportForView = new AirportModel();
    // this.selectedPosition = event.latLng;
    this.airportForView.parallel = event.latLng.lat();
    this.airportForView.meridian = event.latLng.lng();
    console.log(event.latLng);
  }

  handleOverlayClick(event: any) {
    this.msgs = [];
    let isMarker = event.overlay.getTitle() != undefined;
    console.log('in hangleOverlayClick');
    console.log(this.overlays[137]);
    if(isMarker) {

      console.log(event.overlay.getTitle());
      console.log(event.overlay);

      let str = event.overlay.getTitle().toString();
      // this.name = str.split(',')[0];
      this.airportForView.name = str.split(',')[0];
      this.headerDialog = 'Изменение аэропорта';
      this.buttonDialog = this.changeAirportString;
      this.dialogVisible = true;

      this.airportCitiesService.getAllAirports().then((allAirports) => {

        let chosenAirport = this.airportCitiesService.getAirportByName(allAirports, this.airportForView.name);
        console.log(chosenAirport);
        // this.cityName = chosenAirport.cityName;
        this.airportForView = chosenAirport;

        // let title = event.overlay.getTitle();
        // this.infoWindow.setContent('' +title + '');
        // this.infoWindow.open(event.map, event.overlay);
        // event.map.setCenter(event.overlay.getPosition());
         this.overlayForUpdate = event.overlay;
        // this.msgs.push({severity:'info', summary:'Marker Selected', detail: title});

      });
    }
    // else {
    //   this.msgs.push({severity:'info', summary:'Shape Selected', detail: ''});
    // }
  }

  changeButton() {
    if (this.airportForView.city.name && this.airportForView.name) {
      if (this.buttonDialog === this.changeAirportString) {
        this.updateAirport();
      } else {
        this.addAirport();
      }
    }
  }

  updateAirport() {
    this.airportForView.parallel = this.overlayForUpdate.position.lat();
    this.airportForView.meridian = this.overlayForUpdate.position.lng();
    console.log('Обновляем аэропорт ' + this.airportForView.name + ', ' + this.airportForView.city.name);

    this.airportCitiesService.checkCityByName(this.airportForView.city.name).then((result)=> {
      if (result) {
        this.airportCitiesService.updateAirport(this.airportForView).then(() => {
          //this.initOverlays();
          this.updateAllOverlays(this.airportForView.id, this.overlayForUpdate);
          console.log('---------Обновлено------------');
          //this.airportForView = new AirportModel();
          this.draggable = false;
          this.dialogVisible = false;
        })
      }
      else {
        this.airportCitiesService.addCity(this.airportForView.city.name).then(() => {
          this.airportCitiesService.updateAirport(this.airportForView).then(() => {
            //this.initOverlays();
            this.updateAllOverlays(this.airportForView.id, this.overlayForUpdate);
            console.log('---------Обновлено------------');
            //this.airportForView = new AirportModel();
            this.draggable = false;
            this.dialogVisible = false;
          })
        })
      }
      console.log('--------------endendend---------------');
    });
  }

  updateOverlay() {
      console.log('updateOverlay : ');
      console.log(this.overlayForUpdate);
      let index = this.overlays.findIndex((element) => {
        return this.overlayForUpdate.getTitle() === element.getTitle();
      });

      this.overlays[index] = this.overlayForUpdate;
      //this.overlays[index].draggable = this.draggable;
      this.overlays[index].draggable = true;
      console.log(index);
      console.log(this.overlays[index]);
      console.log(this.overlayForUpdate.draggable);
      console.log(this.overlays[index].draggable);

  }

  addAirport() {

    let airport = new AirportModel();
    let cityName = this.airportForView.city.name;

    console.log(this.airportForView);


    this.airportCitiesService.checkCityByName(this.airportForView.city.name).then((result)=>{
      if (result) {
        console.log('Добавляем аэропорт ' + this.airportForView.name + ', ' + this.airportForView.city.name);
        this.airportForView.setCity(this.airportForView.city.name);
        this.airportCitiesService.addAirport(this.airportForView).then(() => {
          this.initOverlays();
          console.log('---------Добавлено--------');
          this.airportForView = new AirportModel();
          this.dialogVisible = false;
        });
      } else {
        this.airportCitiesService.addCity(this.airportForView.city.name).then(() => {
          this.airportCitiesService.addAirport(this.airportForView).then(() => {
            this.initOverlays();
            console.log('---------Добавлено--------');
            this.airportForView = new AirportModel();
            this.dialogVisible = false;
          });
        })
      }
    })



  }

  deleteAirport() {
    console.log('Удаляем следующий аэропорт');
    console.log(this.airportForView);
    this.airportCitiesService.deleteAirport(this.airportForView).then(() => {
      this.initOverlays();
      console.log('---------Удалено--------');
      this.dialogVisible = false;
      //this.airportForView.city = new CityModel('');

    })
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
    console.log('Загружаем слои аэропорта с нуля ')
    this.overlays = [];
    this.airportCitiesService.getAllAirports().then((airports) => {
      for (let airport of airports) {
        //console.log(airport.parallel,  airport.meridian, airport.name);

        this.overlays.push(new google.maps.Marker(
          {
            position: { lat: airport.parallel, lng: airport.meridian},
            title:airport.name+', '+airport.city.name,
            draggable: false
          }))
      }
    });

  }

  updateAllOverlays(id: number, overlay: any) {
    overlay.draggable = this.draggable;
    console.log(overlay.position.lat(), overlay.position.lng());
    console.log('Загружаем все слои с одним определенным');
    console.log(new google.maps.Marker({
      position: {
        lat: overlay.position.lat(),
        lng: overlay.position.lng()
      },
      title: this.airportForView.name  + ', ' + this.airportForView.city.name,
      draggable: overlay.draggable
    }));
    console.log((new google.maps.Marker(
      {
        position: {lat: 23, lng: 23},
        title:  'name name',
        draggable: false
      })));
    this.overlays = [];
    this.airportCitiesService.getAllAirports().then((airports) => {
      for (let airport of airports) {
        //console.log(airport.parallel,  airport.meridian, airport.name);
        if (airport.id === id) {
          //this.overlays.push(overlay);
          this.overlays.push(
            new google.maps.Marker({
              position: {
                lat: overlay.position.lat(),
                lng: overlay.position.lng()
              },
              title: this.airportForView.name  + ', ' + this.airportForView.city.name,
              draggable: overlay.draggable
            }))
        } else {
          this.overlays.push(new google.maps.Marker(
            {
              position: {lat: airport.parallel, lng: airport.meridian},
              title: airport.name + ', ' + airport.city.name,
              draggable: false
            }))

        }
      }

      console.log('------ Слои с одним определенным загружены --------');
    });
  }

  updateCoords(event: any) {
    console.log(event);
  }


  zoomIn(map: any) {
    map.setZoom(map.getZoom()+1);
  }

  zoomOut(map: any) {
    map.setZoom(map.getZoom()-1);
  }
}


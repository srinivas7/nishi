import { Component, OnInit, Input, Output, EventEmitter, AfterViewInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppService } from '../services/app.service';
import { BOUNDARY_ALERT_CONFIG } from 'src/environments/environment';
import { Customer } from '../customer/customer';

declare var ol: any;
declare var L: any;
declare var MQ: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit, AfterViewInit {
  public customer: Customer;
  markersLayer: any;
  map: any;

  @Output()
  viewTripdetail = new EventEmitter();
  ribbonConfig: any;
  locationData: any;
  config: any;
  mapId: any;
  latlngs: any;
  startLocation: any;
  endLocation: any;
  routeLayer: any;
  leafletExpandIcon: any;
  startLocationIcon: any;
  endLocationIcon: any;
  endIcon: boolean;
  tripMapIcon: any;
  pointsLayer: any;
  mapKey: any;
  mapConf: any;

  @Input() trip: any;

  public base_url_Map: string = 'http://vzc-gps-trail-api.stg.dat.aws.vz-connect.net:8080/tripdetail/';
  public mapsData: any;
  public eventData: any;
  public routePoints: any[] = [];
  constructor(private router: Router, private apiService: AppService) { }

  ngOnInit() {
    this.pointsLayer = new L.LayerGroup();
    this.getTripMapData();
  }

  private getTripMapData() {

    // let postData = {
    //   "imei":this.customer.imei,
    //   "year": new Date().getFullYear(),
    //   "month": new Date().getMonth(),
    //   "day": new Date().getDate(),
    //   "transactionid": "Testing"
    //   }

      this.apiService.getJson('assets/map.json').subscribe(res => {
        console.log(res);
        //let data = res as any;
        this.mapsData = res;
        this.latlngs = this.getRoutePointList();
        this.renderPolyline();
      })

    // this.apiService.post(this.base_url_Map, postData).subscribe(res => {
    //   console.log(res);
    //   let data = res as any;
    //   this.mapsData = data.data;
    //   this.latlngs = this.getRoutePointList();
    //   this.renderPolyline();
    // });
  }

  ngAfterViewInit() {
    this.initializeMap();
  }

  initializeMap = function () {
    if (this.mapConf && this.mapConf.DEFAULT_CONFIG && this.mapConf.DEFAULT_CONFIG.mapKey) {
      this.mapKey = this.mapConf.DEFAULT_CONFIG.mapKey.mapkey
    } else {
      this.mapKey = BOUNDARY_ALERT_CONFIG.mapkey
    };
    L.mapquest.key = this.mapKey;
    let baseLayer = L.mapquest.tileLayer('map');
    this.latlang = [33.9146498, -84.34197];
    this.routeLayer = new L.FeatureGroup();
    this.map = L.mapquest.map('map', {
      center: this.latlang,
      layers: baseLayer,
      zoomControl: false,
      zoom: 16,
      maxZoom: 20,
      draggable: true,
    });
    this.btncontrolls(this);
    this.markersLayer = new L.LayerGroup();
    this.map.addLayer(this.markersLayer);
    this.map.scrollWheelZoom.disable();
  };

  getMarker(data, key) {
    return new L.marker([data.lat, data.lng], {
      icon: this.tripMapIcon,
    })
      .bindPopup('Test')
      .openPopup();
  }

  renderMarker() {
    let address = [],
      markers = new L.LayerGroup();

    this.initializeIcons();
    let marker;

    address.push(this.latlngs[0]);
        marker = new L.marker([this.latlngs[0].lat, this.latlngs[0].lng], {
          icon: this.startLocationIcon,
        })
          .bindPopup('<strong>' + this.latlngs[0].lat + '</strong>')
          .openPopup();
        markers.addLayer(marker);
        address.push(this.latlngs[this.latlngs.length-1]);
        marker = new L.marker([this.latlngs[this.latlngs.length-1].lat, this.latlngs[this.latlngs.length-1].lng], {
          icon: this.endLocationIcon,
        })
          .bindPopup('<strong>' + [this.latlngs[this.latlngs.length-1].lat] + '</strong>')
          .openPopup();
        markers.addLayer(marker);


    setTimeout(() => {
      if (this.map) {
        this.map.removeLayer(this.pointsLayer);
        this.pointsLayer.clearLayers();
        markers.addTo(this.pointsLayer);
        this.pointsLayer.addTo(this.map);
      }
    }, 0);
  }

  renderPolyline() {
    let allpoints = [];
    let currentpoints = [];
    let routeLayer = new L.FeatureGroup();
    this.renderMarker();

      // currentpoints = [
      //   {lat: 36.3411455, lng: -94.234298},
      //   {lat: 36.3411133, lng: -94.234351},
      //   {lat: 36.3411131, lng: -94.234352},
      //   {lat: 36.341276, lng: -94.234146},
      //   {lat: 36.3413749, lng: -94.234828},
      //   {lat: 36.3413295, lng: -94.234874},
      //   {lat: 36.3412241, lng: -94.235484},
      //   {lat: 36.3428898, lng: -94.235686},
      //   {lat: 36.34324, lng: -94.236995},
      //   {lat: 36.3432934, lng: -94.239601},
      //   {lat: 36.3432864, lng: -94.239757},
      //   {lat: 36.3438288, lng: -94.240271},
      //   {lat: 36.3458844, lng: -94.240244},
      //   {lat: 36.3472903, lng: -94.240252},
      //   {lat: 36.3493441, lng: -94.24023},
      //   {lat: 36.3495092, lng: -94.240222},
      //   {lat: 36.3517121, lng: -94.240152},
      //   {lat: 36.3539841, lng: -94.240098},
      //   {lat: 36.3562055, lng: -94.240058},
      //   {lat: 36.3575135, lng: -94.239745},
      //   {lat: 36.3575167, lng: -94.239634}
      //   ];

      for(let i=1; i<this.latlngs.length-1; i++) {
      allpoints.push(this.latlngs[0]);

      //currentpoints.push(this.latlngs[i-1]);

      //allpoints = [...allpoints, ...[this.latlngs[map]]];
      currentpoints = [...currentpoints, ...[this.latlngs[i]]];

      //allpoints.push(this.latlngs[this.latlngs.length-1]);
      //currentpoints.push(this.latlngs[i+1]);

      let ribbonColor = '#08BFC1';
      let polyline = new L.Polyline(currentpoints, {
        color: ribbonColor,
        weight: 4,
        opacity: 1,
        smoothFactor: 1,
      });
      polyline.addTo(routeLayer);
    }

    setTimeout(() => {
      this.map.removeLayer(this.routeLayer);
      routeLayer.addTo(this.routeLayer);
      this.routeLayer.addTo(this.map);
      if (currentpoints.length > 1) {
        this.map.flyToBounds(this.routeLayer.getBounds(), { maxZoom: 20, zoom: 16 });
      }
    }, 0);
  }

  renderExpandIcon(self) {
    let customControl = L.Control.extend({
      options: {
        position: 'bottomright',
      },
      onAdd: function () {
        self.leafletExpandIcon = L.DomUtil.create('div', 'leaflet-bar leaflet-control leaflet-control-custom');
        self.leafletExpandIcon.id = 'leaflet-control-expand';
        self.leafletExpandIcon.style.backgroundColor = 'white';
        self.leafletExpandIcon.style.width = '35px';
        self.leafletExpandIcon.style.height = '35px';
        self.leafletExpandIcon.style.borderRadius = '16px';
        self.leafletExpandIcon.style.boxShadow = 'none';
        self.leafletExpandIcon.style.display = 'none';
        self.leafletExpandIcon.innerHTML = `<img class="cursor" src="./assets/driving-history/map-expand.svg" style="width: 40px; height:40px;cursor:pointer">`;

        self.leafletExpandIcon.onclick = function () {
          self.expand('test', self);
        };
        return self.leafletExpandIcon;
      },
    });

    if (this.map) {
      this.map.addControl(new customControl());
    }
  }
  btncontrolls(self) {
    let vehiclePosition = [40.7128, -74.006];
    // Adding layer group
    this.markersLayer = new L.LayerGroup();
    this.map.addLayer(this.markersLayer);
    this.renderExpandIcon(self);
    // Zoom control button
    let zoomControl = L.control
      .zoom({
        position: 'bottomright',
      })
      .addTo(this.map);
  }

  initializeMapOld() {
    this.getMapContent();
    let a = { "latLng": { "lat": 34.1218253, "lng": -84.11594 } }
    this.routePoints.push(a);
    this.map = L.mapquest.map('map', {
      center: [37.7749, -122.4194],
      layers: L.mapquest.tileLayer('map'),
      zoom: 12,
      maxZoom: 18,
      draggable: true,
    });

    L.mapquest.directions().route({
      start: [this.trip.startLatitude, this.trip.startLongitude],
      end: [this.trip.endLatitude, this.trip.endLongitude],
      //waypoints: this.getRoutePointList(),
      waypoints: this.getEventPointList(),
      optimizeWaypoints: false
    });

    this.map.addControl(L.mapquest.control());
  }

  private getMapContent() {
    let payload = {
      "imei": this.trip.imei,
      "year": new Date().getFullYear().toString(),
      "month": (new Date().getMonth() + 1).toString(),
      "day": new Date().getDay().toString(),
      "transactionid": "Test"
    }
    this.apiService.post(this.base_url_Map, payload).subscribe(res => {
      console.log(res);
    })
  }

  initializeIcons() {
    this.tripMapIcon = L.icon({
      iconUrl: './assets/driving-history/trip-map-marker.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
    this.startLocationIcon = L.icon({
      iconUrl: './assets/driving-history/start-location.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
    this.endLocationIcon = L.icon({
      iconUrl: './assets/driving-history/end-location.svg',
      iconSize: [20, 29],
      iconAnchor: [10, 29],
      popupAnchor: [0, -29],
    });
  }

  private getEventPointList(): Array<any>[] {
    let locations = { latLng: { lat: 0, lng: 0 } };
    let events = this.trip.evtDetails.events;
    this.routePoints = [];
    events = (events.length > 0) ? events.filter(e => e[4] != "NE") : [];
    events.forEach(element => {
      locations = { latLng: { lat: 0, lng: 0 } };
      locations.latLng.lat = element[2];
      locations.latLng.lng = element[3];
      this.routePoints.push(locations);
    });
    return this.routePoints;
  }

  private getRoutePointList(): Array<any>[] {
    let locations = { lat: 0, lng: 0 };
    this.routePoints = [];
    let gpsLength: number = this.mapsData.imei.trips[0].tripPackets.detail.gps.length;
    for (let gps = 0; gps < gpsLength; gps++) {
      for (let pt = 0; pt < this.mapsData.imei.trips[0].tripPackets.detail.gps[gps].length; pt++) {
        locations = {
          lat: Number(this.mapsData.imei.trips[0].tripPackets.detail.gps[gps][pt][1])
          , lng: Number(this.mapsData.imei.trips[0].tripPackets.detail.gps[gps][pt][2])
        };
        //tions.latLng.lat = Number(this.mapsData.imei.trips[0].tripPackets.detail.gps[gps][pt][1]);
        //locations.latLng.lng = Number(this.mapsData.imei.trips[0].tripPackets.detail.gps[gps][pt][2]);
        this.routePoints.push(locations);
      }
    }
    //let maxRoute = this.routePoints.slice(0, 14);
    return this.routePoints;
  }

  public navigateToEventDetails() {
    this.router.navigate(['/event-detail']);
  }
}

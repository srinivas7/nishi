import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Customer } from '../customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css']
})
export class TripsComponent implements OnInit {
  public customer: Customer;
  public userId: string;
  public tripsList: any;
  public trip: any;
  public showTripMap: boolean = false;
  public showTripEvents: boolean = false;
  dateFilterUIString = '';
  // public tripStartDate: string = new Date().toISOString().split('T')[0];
  public tripStartDate: Date = new Date();
  public base_url_trip: string = 'https://apix.vtitel.com/HTIWebGateway/vv/rest/DrivingHistory/getDrivingHistory';
  constructor(private apiService: AppService, private router: Router, private route: ActivatedRoute, private dateToString: DateFormatPipe) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getAllTrips();
  }

  private getCustomer() {
    this.route.params.subscribe(params => {
      this.userId = params['userId'];
    });
    this.customer = this.apiService.getStorage();
  }

  private getAllTrips() {
    // let postData = {
    //   "dataArea": {
    //     "endDate": this.tripStartDate,
    //     "overallSummaryNeededFlag": true,
    //     "startDate": this.tripStartDate,
    //     "preWeekEndDate": this.tripStartDate,
    //     "preWeekStartDate": this.tripStartDate,
    //     "summaryType": "day",
    //     "userId": this.customer.userid,
    //     "vehicleId": this.customer.imei_meid
    //   },
    //   "header": {
    //     "applicationName": "mapp",
    //     "organization": "hum",
    //     "region": "US",
    //     "sourceName": "android",
    //     "timestamp": "2019-03-26T14:05:07.951-04:00",
    //     "transactionId": "1038846624877909282678640744792019040101"
    //   }
    // }

    // this.apiService.post(this.base_url_trip, postData).subscribe(res => {
    //   console.log(res);
    //   let data = res as any;
    //   this.tripsList = data.data;
    // });
    this.apiService.getJson('assets/trips.json').subscribe(res => {
      this.tripsList = res;
    });
  }
  public showMap(selected: any) {
    this.showTripMap = false;
    this.showTripEvents = false;
    this.trip = selected;
    setTimeout(() => {
      this.showTripMap = true;
      this.showTripEvents = true;
    }, 100);
  }
  public navigateToEventDetails() {
    this.router.navigate(['/event-detail']);
  }
  public nextDate(){
    let current = new Date(this.tripStartDate);
    if(current.getDate()+1 != new Date().getDate()){
      current.setDate(current.getDate()+1);
      // this.tripStartDate = current.toISOString().split('T')[0];
      this.getAllTrips();
    }else{
      alert("no next day records");
    }
  }
  public previousDate(){
    let current = new Date(this.tripStartDate);
    current.setDate(current.getDate()-1);
    // this.tripStartDate = current.toISOString().split('T')[0];
    this.getAllTrips();
  }

  changeDate(moveForward) {
    let cd = new Date();
    cd.setHours(0, 0, 0, 0);
    let dayMS = 24 * 60 * 60 * 1000;

}
}

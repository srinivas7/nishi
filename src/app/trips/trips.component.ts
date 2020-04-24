import { Component, OnInit } from '@angular/core';
import { AppService } from '../services/app.service';
import { Customer } from '../customer/customer';
import { ActivatedRoute, Router } from '@angular/router';
import { DateFormatPipe } from '../date-format.pipe';
import {DialogService} from 'primeng/dynamicdialog';
import {EventDetailsComponent} from '../event-details/event-details.component';

@Component({
  selector: 'app-trips',
  templateUrl: './trips.component.html',
  styleUrls: ['./trips.component.css'],
  providers: [DialogService]
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
  minDate: Date;  
  maxDate: Date;

  constructor(private apiService: AppService, private router: Router, private route: ActivatedRoute, 
    private dateToString: DateFormatPipe, public dialogService: DialogService) { }

  ngOnInit(): void {
    this.getCustomer();
    this.getAllTrips();
    this.setCalendarDates();
    
  }

  private setCalendarDates() {
    let today = new Date();
    let month = today.getMonth();
    let year = today.getFullYear();
    let prevMonth = (month === 0) ? 11 : month -1;
    let prevYear = (prevMonth === 11) ? year - 1 : year;
    let nextMonth = (month === 11) ? 0 : month + 1;
     
    this.minDate = new Date();
    let prevDate = this.minDate.getDate() - 15
    this.minDate.setDate(prevDate);
    this.minDate.setFullYear(prevYear);
    this.maxDate = new Date();
    // this.maxDate.setMonth(nextMonth);
    // this.maxDate.setFullYear(nextYear);
    console.log('datesss...', this.minDate, this.maxDate);
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
    console.log(this.tripStartDate);
    if (this.tripStartDate.getDate() == new Date().getDate()) {
      alert("no next day records");
      return;
    }
    let current = new Date(this.tripStartDate);
    current.setDate(current.getDate()+1);
    this.tripStartDate = current;
    this.getAllTrips();
  }
  public previousDate(){
    let minDate = new Date(new Date().setDate(new Date().getDate() - 15));
    let current = new Date(this.tripStartDate);
    if (current < minDate) {
      alert('no records');
      return;
    }
    current.setDate(current.getDate()-1);
    this.tripStartDate = current;
    this.getAllTrips();
  }

  changeDate(moveForward) {
    let cd = new Date();
    cd.setHours(0, 0, 0, 0);
    let dayMS = 24 * 60 * 60 * 1000;

}
show() {
  const ref = this.dialogService.open(EventDetailsComponent, {
      width: '90%',
      showHeader: true,
      closable: true
  });
}
}

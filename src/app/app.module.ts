import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { ChartsModule } from 'ng2-charts';
import { ChartComponent } from './chart/chart.component';
import { CustomerComponent } from './customer/customer.component';
import { TripsComponent } from './trips/trips.component';
import { EventDetailsComponent } from './event-details/event-details.component';
import { AppService } from './services/app.service';
import { DateFormatPipe } from './date-format.pipe';
@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    ChartComponent,
    CustomerComponent,
    TripsComponent,
    EventDetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule
  ],
  providers: [AppService,DateFormatPipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

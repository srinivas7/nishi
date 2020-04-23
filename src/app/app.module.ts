import {BrowserModule} from '@angular/platform-browser';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
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
import {AddSpacePipe} from './trips/remove.space.pipe';
import { HourPipe } from './trips/hour.pipe';
import {CalendarModule} from 'primeng/calendar';
import {OverlayPanelModule} from 'primeng/overlaypanel';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {CommonModule} from '@angular/common';
import {ToastModule} from 'primeng/toast';
import {TableModule} from 'primeng/table';
import {ButtonModule} from 'primeng/button';
import {TabViewModule} from 'primeng/tabview';
import {CodeHighlighterModule} from 'primeng/codehighlighter'

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    CustomerComponent,
    TripsComponent,
    AddSpacePipe,
    HourPipe,
    EventDetailsComponent, 
    ChartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    ChartsModule,
    AppRoutingModule,
    CalendarModule,
    OverlayPanelModule,
    CommonModule,
        DynamicDialogModule,
  ],
  providers: [AppService,DateFormatPipe],
  bootstrap: [AppComponent],
  entryComponents: [EventDetailsComponent, ChartComponent]
})
export class AppModule { }

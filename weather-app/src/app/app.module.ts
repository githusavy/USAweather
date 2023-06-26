import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { NgChartsModule } from 'ng2-charts'; 
import { MatTableModule } from '@angular/material/table';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WeatherComponent } from './weather/weather.component';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartComponent } from './chart/chart.component';
import { LookupHistoryComponent } from './lookup-history/lookup-history.component';


@NgModule({
  declarations: [
    AppComponent,
    WeatherComponent,
    ChartComponent,
    LookupHistoryComponent
  ],
  imports: [
    BrowserModule,
    MatButtonModule,
    MatTableModule,
    NgChartsModule,
    MatSelectModule,
    MatTooltipModule,
    MatCardModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

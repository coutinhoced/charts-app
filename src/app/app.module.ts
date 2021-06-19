import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {FormsModule } from '@angular/forms'
import { AppComponent } from './app.component';
import { ChartsModule } from 'ng2-charts';
import { DoughnutChartComponent } from './doughnut-chart/doughnut-chart.component';
import { IncidentService } from './Shared/Services/Incident.service';
import { HttpClientModule} from '@angular/common/http';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { RadarChartComponent } from './radar-chart/radar-chart.component';
import { LineChartComponent } from './line-chart/line-chart.component';
import { PolarAreaChartComponent } from './polar-area-chart/polar-area-chart.component';
import { GridElementsComponent } from './grid-elements/grid-elements.component';
import { AgGridModule } from 'ag-grid-angular';
import { BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import 'chartjs-plugin-piechart-outlabels';
import { SettingsComponent } from './settings/settings.component';
import { DashboardContainerComponent } from './dashboard-container/dashboard-container.component';
import { ControlFactoryDirective } from '../app/Directives/control-factory-directive';
import { TicketstatusChartComponent } from './ticketstatus-chart/ticketstatus-chart.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { RouterModule, Routes} from '@angular/router';
import { TicketassignetresolvedcountChartComponent } from './ticketassignetresolvedcount-chart/ticketassignetresolvedcount-chart.component';
import { AvgdayclosureChartComponent } from './avgdayclosure-chart/avgdayclosure-chart.component';

const appRoutes : Routes =[
   {path : '', component:LoginComponent},
   {path: 'settings', component:SettingsComponent},
   {path: 'dashboard', component:DashboardContainerComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    DoughnutChartComponent,
    BarChartComponent,
    RadarChartComponent,
    LineChartComponent,
    PolarAreaChartComponent,
    GridElementsComponent,
    SettingsComponent,
    LoginComponent,
    DashboardContainerComponent,
    ControlFactoryDirective,
    TicketstatusChartComponent,
    HeaderComponent,
    TicketassignetresolvedcountChartComponent,
    AvgdayclosureChartComponent
  ],
  imports: [
    BrowserModule,
    ChartsModule,
    HttpClientModule,
    FormsModule,   
    BsDatepickerModule.forRoot(), 
    BrowserAnimationsModule,
    RouterModule.forRoot(appRoutes),
    AgGridModule.withComponents([])
  ],
  entryComponents :[LoginComponent, BarChartComponent,DoughnutChartComponent,  RadarChartComponent,
                    LineChartComponent,   PolarAreaChartComponent, TicketstatusChartComponent, TicketassignetresolvedcountChartComponent,
                    AvgdayclosureChartComponent],
  providers: [IncidentService],
  bootstrap: [AppComponent]
})
export class AppModule { }

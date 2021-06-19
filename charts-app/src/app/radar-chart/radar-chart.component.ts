import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartType, RadialChartOptions } from 'chart.js';
import { Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-radar-chart',
  templateUrl: './radar-chart.component.html',
  styleUrls: ['./radar-chart.component.css']
})
export class RadarChartComponent implements OnInit {
  radarChartOptions: RadialChartOptions;
  radarChartLabels: Label[];
  radarChartData: ChartDataSets[];
  radarChartType: ChartType;  
  ticketsCountByMonthData = new Map<string, number>();
  month : string[] = [];
  counts : number[] = [];
  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";

  dataPresent : boolean  = false;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindTicketsCreatedByMonth(this.countryFilter, this.fdateFilter, this.tdateFilter);
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        this.countryFilter = country;   
        this.BindTicketsCreatedByMonth(this.countryFilter, this.fdateFilter, this.tdateFilter);       
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindTicketsCreatedByMonth(this.countryFilter, this.fdateFilter, this.tdateFilter);  
    })  
  }
 
  BindTicketsCreatedByMonth(filterCountryvalue : string, fDatevalue : string, tDatevalue : string){
    this.ticketsCountByMonthData = this.incidentService.FilterTicketsCreatedByMonthCount(filterCountryvalue, fDatevalue, tDatevalue);            
    this.month = Array.from(this.ticketsCountByMonthData.keys());   
    this.counts = Array.from(this.ticketsCountByMonthData.values());    
    if(this.month.length > 0) {
      this.dataPresent = true;
    }
    else{
      this.dataPresent = false;
    }

    this.radarChartOptions = {
      responsive: true,
      scale: {    
        pointLabels: {
            fontSize: 16,
            fontStyle: 'bold'    
        },         
      },
      legend:{
        labels:{
          fontColor: 'black',
          fontStyle : 'bold'      
        },  
          
      }
    };
    
    this.radarChartLabels = this.month;  
    this.radarChartData = [
      { 
        backgroundColor: 'green',
        borderColor: 'black',
        barThickness: 55,
        hoverBackgroundColor: 'black',    
        pointBackgroundColor: 'red',
        data: this.counts,       
        label: 'Incidents Created By month' }
    ];
    this.radarChartType = 'radar';
  }
  
  
  

}

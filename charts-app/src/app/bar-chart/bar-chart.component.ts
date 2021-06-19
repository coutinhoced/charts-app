import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.css']
})
export class BarChartComponent implements OnInit {
  barChartOptions: ChartOptions;
  barChartLabels : Label[];
  barChartType: ChartType;
  barChartLegend = true;
  barChartPlugins = [];  
  barChartData: ChartDataSets[]
  incidentTypeCountData = new Map<string, number>();
  incidenttype : string[] = [];
  counts : number[] = [];  

  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";
  incidentDataPresent : boolean  = false;
 
  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {    
    this.BindIncidentClassificationChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
   
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        this.countryFilter = country;   
        this.BindIncidentClassificationChart(this.countryFilter, this.fdateFilter, this.tdateFilter);   
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindIncidentClassificationChart(this.countryFilter, this.fdateFilter, this.tdateFilter);      
    }) 
  }

  BindIncidentClassificationChart(filterCountryvalue : string, fDatevalue : string, tDatevalue : string) {    
    this.incidentTypeCountData = this.incidentService.FilterIncidentTypeByThereCount(filterCountryvalue,fDatevalue, tDatevalue );            
    this.incidenttype = Array.from(this.incidentTypeCountData.keys());   
    this.counts = Array.from(this.incidentTypeCountData.values());

    if(this.incidenttype.length > 0) {
      this.incidentDataPresent = true;
    }
    else{
      this.incidentDataPresent = false;
    }

    this.barChartOptions = {      
      responsive: true,  
       legend :{      
         labels:{
           fontColor: 'black',
           fontStyle:'bold'     
         }
       },
       scales: {
        yAxes: [{
            ticks: {
                fontSize: 16,
                fontStyle : 'bold',
                fontColor: 'black'
            }
        }],      
        xAxes: [{
          ticks: {
              fontSize: 16,
              fontStyle : 'bold',
              fontColor: 'black'
          }
        }],
     } 
    };

    this.barChartLabels = this.incidenttype;
    this.barChartType = 'horizontalBar';
    this.barChartLegend = true;
    this.barChartPlugins = [];  
  
    this.barChartData = [
      { 
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 50,
        minBarLength: 2,                        
        backgroundColor: 'rgb(128, 255, 0)',             
        data: this.counts,
        label: 'Incidents Classification' },    
    ];   
  }
  
  
     
 
 

 
}

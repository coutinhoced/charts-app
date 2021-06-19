import { Component, OnInit } from '@angular/core';
import { SingleDataSet, MultiDataSet, Label } from 'ng2-charts';
import { ChartType, ChartOptions } from 'chart.js';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-polar-area-chart',
  templateUrl: './polar-area-chart.component.html',
  styleUrls: ['./polar-area-chart.component.css']
})
export class PolarAreaChartComponent implements OnInit {
  polarChartOptions: ChartOptions;
  polarAreaChartLabels: Label[] ;
  polarAreaChartData: MultiDataSet;
  polarAreaLegend : boolean;
  polarAreaChartType: ChartType;
  geoTicketData = new Map<string, number>();
  geoLocation : string[] = [];
  count :number[] = [];
  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";

  geoLocDataPresent : boolean  = false;
   
  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindGeoLocationChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        this.countryFilter = country;   
        this.BindGeoLocationChart(this.countryFilter, this.fdateFilter, this.tdateFilter );       
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindGeoLocationChart(this.countryFilter,  this.fdateFilter, this.tdateFilter);  
    })  
  }

  BindGeoLocationChart(filterCountryvalue : string, fDatevalue : string, tDatevalue : string){
    this.geoTicketData = this.incidentService.FilterByGeoLocationCount(filterCountryvalue,fDatevalue, tDatevalue);
    this.geoLocation =  Array.from(this.geoTicketData.keys()); 
    this.count =  Array.from(this.geoTicketData.values()); 

    if(this.geoLocation.length > 0) {
      this.geoLocDataPresent = true;
    }
    else{
      this.geoLocDataPresent = false;
    }
  
    this.polarChartOptions = {
      responsive: true,      
      legend:{
        labels:{
          fontColor: 'black',
          fontStyle : 'bold'      
        },  
          
      },
      plugins:{      
        outlabels:{                        
          text: '%l %v',
          color: 'black',
          stretch: 20,
          textAlign: "center",
          lineWidth: 6,
          font: {
              resizable: true,
              minSize: 10,
              maxSize: 18,            
              display: true,
              padding: 17,
          }
           }
      } ,   
    };
    this.polarAreaChartLabels = this.geoLocation;
    this.polarAreaChartData  = [  
      this.count ];
    this.polarAreaLegend = true;  
    this.polarAreaChartType = 'polarArea';
  }  

  
  
}

import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import { DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-avgdayclosure-chart',
  templateUrl: './avgdayclosure-chart.component.html',
  styleUrls: ['./avgdayclosure-chart.component.css']
})
export class AvgdayclosureChartComponent implements OnInit {
  avgClosurebarChartOptions: ChartOptions;
  avgClosurebarChartLabels : Label[];
  avgClosurebarChartType: ChartType;
  avgClosurebarChartLegend = true;
  avgClosurebarChartPlugins = [];  
  avgClosurebarChartData: ChartDataSets[]
  dayClosureCountData = new Map<string, number>();
  assignee : string[] = [];
  avgCount : number[] = [];  

  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";
  incidentDataPresent : boolean  = false; 

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindDayClosureCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
   
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        this.countryFilter = country;   
        this.BindDayClosureCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter);   
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindDayClosureCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter);      
    })
  }


  BindDayClosureCountChart(filterCountryvalue : string, fDatevalue : string, tDatevalue : string) {    
    this.dayClosureCountData = this.incidentService.FilterAverageDayclosureAssigneeCount(filterCountryvalue,fDatevalue, tDatevalue );            
    this.assignee = Array.from(this.dayClosureCountData.keys());   
    this.avgCount = Array.from(this.dayClosureCountData.values());

    if(this.assignee.length > 0) {
      this.incidentDataPresent = true;
    }
    else{
      this.incidentDataPresent = false;
    }

    this.avgClosurebarChartOptions = {
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

    this.avgClosurebarChartLabels = this.assignee;
    this.avgClosurebarChartType = 'bar';
    this.avgClosurebarChartLegend = true;
    this.avgClosurebarChartPlugins = [];  
  
    this.avgClosurebarChartData = [
      { 
        barPercentage: 0.5,
        barThickness: 50,
        maxBarThickness: 50,
        minBarLength: 2,                                         
        data: this.avgCount,
        label: 'Avg. Day Closure for Asignee' },    
    ];   
  }
  

}

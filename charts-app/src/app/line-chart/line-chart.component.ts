import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.css']
})
export class LineChartComponent implements OnInit {
  lineChartData: ChartDataSets[];
  lineChartLabels: Label[];
  lineChartOptions: ChartOptions;
  lineChartColors: Color[];
  lineChartLegend = true;
  lineChartType = 'line';
  lineChartPlugins = [];
  dollarImpactData = new Map<string, number>();
  monthList : string[] = [];
  dollarList : number[] = [];
  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";

  dataPresent : boolean  = false;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindDollarPerMonthChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        this.countryFilter = country;   
        this.BindDollarPerMonthChart(this.countryFilter, this.fdateFilter, this.tdateFilter);       
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindDollarPerMonthChart(this.countryFilter, this.fdateFilter, this.tdateFilter);  
    }) 
  }

  BindDollarPerMonthChart(filterCountryvalue : string, fDatevalue : string, tDatevalue : string){
    this.dollarImpactData = this.incidentService.FilterByDollarPerMonth(filterCountryvalue, fDatevalue, tDatevalue);
    this.monthList =  Array.from(this.dollarImpactData.keys());
    this.dollarList =  Array.from(this.dollarImpactData.values());

    if(this.monthList.length > 0) {
      this.dataPresent = true;
    }
    else{
      this.dataPresent = false;
    }

      this.lineChartData = [
        { data: this.dollarList, label: 'Dollar Impact' },
      ];
      this.lineChartLabels = this.monthList;  
      this.lineChartOptions  = {
        responsive: true, 
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
  
      this.lineChartColors  = [
        {
          backgroundColor: 'gold',
          borderColor: 'green',
        },
      ];
      this.lineChartLegend = true;
      this.lineChartType = 'line';
      this.lineChartPlugins = [];
  }

  


  

}

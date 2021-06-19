import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-ticketstatus-chart',
  templateUrl: './ticketstatus-chart.component.html',
  styleUrls: ['./ticketstatus-chart.component.css']
})
export class TicketstatusChartComponent implements OnInit {
  ticketStatusbarChartOptions: ChartOptions;
  ticketStatusbarChartLabels: Label[];
  ticketStatusbarChartType: ChartType = 'bar';
  ticketStatusbarChartLegend = true;
  ticketStatusbarChartPlugins = [];     
  ticketStatusbarChartData: ChartDataSets[];
  monthList : string[] = [];
  dataArray : any[] = [];
  ticketsStatusByMonth : any[];

  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";

  ticketDataPresent : boolean  = false;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindTicketStatusbarChart(this.countryFilter, this.fdateFilter, this.tdateFilter);

    this.incidentService.countryChanged.subscribe((country : string)=>{    
      this.countryFilter = country;            
      this.BindTicketStatusbarChart(this.countryFilter, this.fdateFilter, this.tdateFilter);    
  });    

  this.incidentService.dateChanged.subscribe((date: DateRanges) => {
    this.fdateFilter =  date.fDate
     this.tdateFilter =  date.tDate;
    this.BindTicketStatusbarChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
  }) 

  }

  BindTicketStatusbarChart(filterCountryvalue : string, fDatevalue : string, tDatevalue : string)
  {     
    this.ticketsStatusByMonth = this.incidentService.FilterTicketsStatusByMonth(filterCountryvalue, fDatevalue, tDatevalue);
    this.monthList  = Array.from(this.ticketsStatusByMonth[0].keys());
    this.dataArray = this.Filter();

    if(this.monthList.length > 0) {
      this.ticketDataPresent = true;
    }
    else{
      this.ticketDataPresent = false;
    }

     this.ticketStatusbarChartOptions = {
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

    this.ticketStatusbarChartLabels =  this.monthList;
    this.ticketStatusbarChartType= 'bar';
    this.ticketStatusbarChartLegend = true;
    this.ticketStatusbarChartPlugins = [];      
    this.ticketStatusbarChartData = this.dataArray;         
  }

  Filter() : any[]{
    let finalArray : any[] = [];           
    let availableStatus = Array.from(this.ticketsStatusByMonth[2].keys());   
    let intermediateArray : any[] = [];   
       
    availableStatus.forEach(alSts => {  
          let tempArray : any[] = [];   
          this.ticketsStatusByMonth[1].forEach(element => {         
          if(element.get(alSts) == undefined)      
          {
            tempArray.push(0);
          } else {
              tempArray.push(element.get(alSts));        
          }
       });
       intermediateArray.push(tempArray);
     });
       
     for(let i =0; i <= availableStatus.length - 1 ; i++)
     {
        finalArray.push(
          { 
            barPercentage: 0.5,
            barThickness: 25,
            maxBarThickness: 25,           
            data: intermediateArray[i], 
            label :availableStatus[i]
           });
     }    
     return  finalArray;
  } 

}

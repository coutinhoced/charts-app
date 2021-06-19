import { Component, OnInit } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-ticketassignetresolvedcount-chart',
  templateUrl: './ticketassignetresolvedcount-chart.component.html',
  styleUrls: ['./ticketassignetresolvedcount-chart.component.css']
})
export class TicketassignetresolvedcountChartComponent implements OnInit {
  assignedTicketResolvedData = new Map<string, number>();
  assignee : string[] = [];
  resolvedCount : number[] = [];
  doughnutChartLabels : Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType;
  doughnutOptions: ChartOptions;
  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";
  interval : any;
  dataPresent : boolean  = false;

  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
    this.BindTicketAssignedAndResolvedCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        clearInterval(this.interval);
        this.countryFilter = country;   
        this.BindTicketAssignedAndResolvedCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter );       
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {     
      clearInterval(this.interval);
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindTicketAssignedAndResolvedCountChart(this.countryFilter, this.fdateFilter, this.tdateFilter);  
    }) 
  }


  BindTicketAssignedAndResolvedCountChart(filterCountryvalue : string, fDatevalue : string, tfDatevalue : string){
    this.assignedTicketResolvedData = this.incidentService
                                .FilterTicketAssignedAndClosedCount(filterCountryvalue, fDatevalue, tfDatevalue);            
    this.assignee = Array.from(this.assignedTicketResolvedData.keys());   
    this.resolvedCount = Array.from(this.assignedTicketResolvedData.values());
    if(this.assignee.length > 0) {
      this.dataPresent = true;
    }
    else{
      this.dataPresent = false;
    }
    //this.BindChart(this,this.countries, this.tickets);      
     if(this.countryFilter == "--All--" &&  this.assignee.length > 30 ) {     
       let countriesCount = this.assignee.length;      
       let startValue : number = 0;
       let endValue : number = 10;           
      
        let callBack = function(method, scope, a, b){         
          method(scope, a.slice(startValue,endValue), b.slice(startValue,endValue));    
          startValue = endValue;
          endValue = endValue + 10;                
          if( startValue < countriesCount -1 && endValue > countriesCount) {          
            endValue = countriesCount - 1;           
          }               
          else if (startValue == countriesCount -1)
          {
            startValue = 0;
            endValue = 10;  
          }
        }
       callBack(this.BindChart, this, this.assignee, this.resolvedCount);
       this.interval = setInterval( callBack, 9000,  this.BindChart, this, this.assignee, this.resolvedCount);   
      }
      else{
          clearInterval(this.interval);
          this.doughnutChartLabels = [];
          this.doughnutChartData = [];         
          this.BindChart(this,this.assignee, this.resolvedCount );           
      }           
  }

  BindChart(scope : this, assignee : string[], resolvedCount : number[] )
  {    
    scope.doughnutChartLabels = assignee;
    scope.doughnutChartData = [
      resolvedCount
    ];
    scope.doughnutChartType= 'pie';  
    scope.doughnutOptions = {             
      layout: {
        padding: {
            left: 50,
            right: 30,
            top: 160,
            bottom: 80
        },        
    },
      plugins:{      
        outlabels:{    
          backgroundColor : 'black',                    
          text: '%l %v',
          color: 'orange',                                              
          stretch: 5,
          textAlign: "center",
          lineWidth: 3,
          lineColor: 'green',
          font: {  
              weight : 'bold',                                            
              resizable: true,
              minSize: 10,
              maxSize: 18,            
              display: true,
              padding: 17              
          }
           }
      } ,          
      responsive: true,                           
      legend: {
        display: false,
        labels: {                   
            fontColor: 'black',          
            fontSize : 12,
            fontFamily: 'Arial', 
            fontStyle:'bold'                
        },                
      },    
    }; 

  }



}

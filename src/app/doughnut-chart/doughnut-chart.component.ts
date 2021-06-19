import { Component, OnInit, OnChanges } from '@angular/core';
import { ChartType, ChartOptions } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { IncidentService } from '../Shared/Services/Incident.service';
import {DateRanges } from '../Shared/incident-data.model';

@Component({
  selector: 'app-doughnut-chart',
  templateUrl: './doughnut-chart.component.html',
  styleUrls: ['./doughnut-chart.component.css']
})
export class DoughnutChartComponent implements OnInit {    
  countriesTicketData = new Map<string, number>();
  countries : string[] = [];
  tickets : number[] = [];
  doughnutChartLabels : Label[] = [];
  doughnutChartData: MultiDataSet = [];
  doughnutChartType: ChartType;
  doughnutOptions: ChartOptions;
  countryFilter : string = "--All--";
  fdateFilter : string = "";
  tdateFilter : string = "";
  interval : any;
  dataPresent : boolean  = false;

  constructor(private incidentService: IncidentService) {   
  }  
  
  ngOnInit(): void {       
    this.BindTicketVolumeByCountryChart(this.countryFilter, this.fdateFilter, this.tdateFilter);
    this.incidentService.countryChanged.subscribe((country : string)=>{    
        clearInterval(this.interval);
        this.countryFilter = country;   
        this.BindTicketVolumeByCountryChart(this.countryFilter, this.fdateFilter, this.tdateFilter );       
    });    

    this.incidentService.dateChanged.subscribe((date: DateRanges) => {     
      clearInterval(this.interval);
      this.fdateFilter =  date.fDate
      this.tdateFilter =  date.tDate;
      this.BindTicketVolumeByCountryChart(this.countryFilter, this.fdateFilter, this.tdateFilter);  
    })           
  } 
   

  BindTicketVolumeByCountryChart(filterCountryvalue : string, fDatevalue : string, tfDatevalue : string){
    this.countriesTicketData = this.incidentService
                                .FilterCountriesAndNumberOfTicketCreated(filterCountryvalue, fDatevalue, tfDatevalue);            
    this.countries = Array.from(this.countriesTicketData.keys());   
    this.tickets = Array.from(this.countriesTicketData.values());
    if(this.countries.length > 0) {
      this.dataPresent = true;
    }
    else{
      this.dataPresent = false;
    }
    //this.BindChart(this,this.countries, this.tickets);      
     if(this.countryFilter == "--All--" &&  this.countries.length > 30 ) {     
       let countriesCount = this.countries.length;      
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
       callBack(this.BindChart, this, this.countries, this.tickets);
       this.interval = setInterval( callBack, 9000,  this.BindChart, this, this.countries, this.tickets);   
      }
      else{
          clearInterval(this.interval);
          this.doughnutChartLabels = [];
          this.doughnutChartData = [];         
          this.BindChart(this,this.countries, this.tickets );           
      }           
  }

  BindChart(scope : this, countries : string[], tickets : number[] )
  {    
    scope.doughnutChartLabels = countries;
    scope.doughnutChartData = [
      tickets
    ];
    scope.doughnutChartType= 'doughnut';  
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
          color: 'white',                                              
          stretch: 5,
          textAlign: "center",
          lineWidth: 3,
          lineColor: 'red',
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
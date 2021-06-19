import { Injectable, EventEmitter, DebugElement } from '@angular/core';
import { Incident } from '../incident-data.model';
import { Incidents } from '../incident-data.model';
import {DateRanges } from '../incident-data.model';
import { HttpClient } from '@angular/common/http';
import  * as incidentData  from '../JsonFiles/incidents-data.json';
import { KeyValuePipe } from '@angular/common';
 
@Injectable()
export class IncidentService {
     public incident: Incident[];
     private elementUnderVerification = Incidents;
     countryChanged = new EventEmitter<string>();
     dateChanged = new EventEmitter<DateRanges>();
     constructor(private httpClient: HttpClient) {        
          this.incident =  (incidentData as any).default
                            .filter(f => f.country != null && f.country != "-" && f.country != "N/A");           
     }     

     CountryChanged(country : string) {
          this.countryChanged.emit(country);
     }

     DateChanged(fromdate : string, todate : string) {        
          this.dateChanged.emit({fDate : fromdate, tDate : todate})
     }

     GetCountriesDropDownList() : string[] {          
          let countries : string[] = [];
          countries.push("--All--");
          let array = this.incident;          
          array.forEach(el => {
               if(!countries.includes(el.country)){
                    countries.push(el.country);
               }               
          });
         return countries;
     }

     GetDatesDropDownList() : string[] {          
          let dates : string[] = [];
          dates.push("--All--");
          let array = this.incident.filter(f => f.mon_year != null);          
          array.forEach(el => {
               if(!dates.includes(el.mon_year)){
                    dates.push(el.mon_year);
               }               
          });
         return dates;
     }

     //Common method for filtering and aggregating
     MapData(array, emumValue : number) : Map<string, number>{         
          let maps = new Map<string, number>();
          for(let i = 0; i <= array.length -1 ; i++)
          {
               if(!maps.has(array[i][this.elementUnderVerification[emumValue]])){
                    maps.set(array[i][this.elementUnderVerification[emumValue]], 1);
            }
            else
            {
               let value = maps.get(array[i][this.elementUnderVerification[emumValue]])    ;
               value++;
               maps.set(array[i][this.elementUnderVerification[emumValue]] , value);
            }             
           };  
           return maps; 
     }     
     
     GenericFilter(inputArray: Incident[], countryfilterValue : string, fromDateValue : string, toDateValue : string) : any[]
     {       
         let outputArray = [];          
         let fromDate = new Date(fromDateValue);
         let toDate = new Date(toDateValue);

         if (countryfilterValue != "--All--" && fromDateValue != "" && toDateValue != "") {
          // outputArray =  inputArray
          // .filter(f => f.country == countryfilterValue && f.mon_year == filterDateValue);           
              outputArray =  inputArray
               .filter(f => { 
                              let dt = new Date(f.start_date);  
                              return f.country == countryfilterValue && dt >= fromDate && dt <= toDate
                    });                 
           }
          else if (countryfilterValue != "--All--" && fromDateValue == "" && toDateValue == ""){
                         outputArray =  inputArray
                                        .filter(f => f.country == countryfilterValue);    
          }    
          else if (countryfilterValue == "--All--"  && fromDateValue != "" && toDateValue != ""){
                              outputArray = inputArray
                                        .filter(f => 
                                             { 
                                   let dt = new Date(f.start_date);  
                                   return  dt >= fromDate && dt <= toDate 
                                   });                                             
          }
          else {
               outputArray =  inputArray;           
          }        
         return outputArray;
     }

     FilterCountriesAndNumberOfTicketCreated(countryfilterValue : string, fromDateValue : string, toDateValue : string) : Map<string, number>{            
         let array = this.incident;
         let finalArray = this.GenericFilter(array,countryfilterValue, fromDateValue, toDateValue);
         return this.MapData(finalArray, Incidents.country);      
     }


     FilterIncidentTypeByThereCount(countryfilterValue : string, fromDateValue : string, toDateValue : string) : Map<string, number>{
          let array =  this.incident.filter(f => f.incident_type != null);
          let finalArray = this.GenericFilter(array,countryfilterValue,fromDateValue, toDateValue);
          return this.MapData(finalArray, Incidents.incident_type);                    
     }

     FilterTicketsCreatedByMonthCount(countryfilterValue : string, fromDateValue : string, toDateValue : string): Map<string, number>
     {
          let array =  this.incident;    
          let finalArray = this.GenericFilter(array,countryfilterValue,fromDateValue, toDateValue);
          return this.MapData(finalArray, Incidents.mon_year);            
     }

     FilterTicketsStatusByMonth(countryfilterValue : string, fromDateValue : string, toDateValue : string) :  any[]
     {
          let _array =  this.incident
            .filter(f => f.mon_year != null && f.status != null);
          let finalInputArray = this.GenericFilter(_array,countryfilterValue,fromDateValue, toDateValue);  
          let mapByMonthYear = new Map<string, any[]>();   
          let finalArray : any[] = [];       
          let totalAvailableStatus = this.MapData(finalInputArray, Incidents.status);       
          finalInputArray.forEach(element =>{               
               if(!mapByMonthYear.has(element.mon_year)){ 
                    let arrayElement : any[] = [];                   
                    arrayElement.push(element);
                    mapByMonthYear.set(element.mon_year, arrayElement);
              }else
              {
                 let value = mapByMonthYear.get(element.mon_year);   
                 value.push(element);
                 mapByMonthYear.set(element.mon_year, value);
              } 
          });
         
          let mapByStatusByMonthCount : any[] = []; 
          mapByMonthYear.forEach(element => {                  
              mapByStatusByMonthCount.push(this.MapData(Array.from(element.values()),Incidents.status));              
          });

          finalArray.push(mapByMonthYear, mapByStatusByMonthCount, totalAvailableStatus);            
          return finalArray;
     }


     FilterByAssignedToAndCreatedBy()
     {
          let array =  this.incident
          .filter(f => f.assigned_to != null && f.created_by != null);

           let assignedCreatedMap = new Map<string, string[]>();
           array.forEach(element => {              
               if(!assignedCreatedMap.has(element.assigned_to)){ 
                    let createdBy : string[] = [];
                    createdBy.push(element.created_by);
                    assignedCreatedMap.set(element.assigned_to, createdBy);
              }else
              {
                 let value = assignedCreatedMap.get(element.assigned_to);   
                 value.push(element.created_by);
                 assignedCreatedMap.set(element.assigned_to, value);
              } 
           });          
          
           console.log(assignedCreatedMap);
           return assignedCreatedMap;
     }

     FilterByDollarPerMonth(countryfilterValue : string,  fromDateValue : string, toDateValue : string) : Map<string, number>{
          let _array =  this.incident
          .filter(f => f.dollar_impact != null && f.mon_year != null);
          let finalArray = this.GenericFilter(_array,countryfilterValue,fromDateValue, toDateValue);
          let dollarImpactMap = new Map<string, number>();
          finalArray.forEach(element => {                    
               if(!dollarImpactMap.has(element.mon_year)){ 
                    let dollar : number = Math.round(Number(element.dollar_impact));
                    dollarImpactMap.set(element.mon_year, dollar);
              }else
              {
                 let value = dollarImpactMap.get(element.mon_year);   
                 value = value + Math.round(Number(element.dollar_impact));
                 dollarImpactMap.set(element.mon_year, value);
              } 
           });           
           return dollarImpactMap; 
     }


     FilterByGeoLocationCount(countryfilterValue : string, fromDateValue : string, toDateValue : string) : Map<string, number>{
          let array =  this.incident.filter(f => f.geo != null);
          let finalArray = this.GenericFilter(array,countryfilterValue,fromDateValue, toDateValue);
          return this.MapData(finalArray, Incidents.geo);          
     }

     FilterTicketAssignedAndClosedCount(countryfilterValue : string, fromDateValue : string, toDateValue : string) : Map<string, number>{
          let array =  this.incident.filter(f => f.assigned_to != null && f.status == "Resolved");
          let finalArray = this.GenericFilter(array,countryfilterValue,fromDateValue, toDateValue);
          return this.MapData(finalArray, Incidents.assigned_to);          
     }

     FilterAverageDayclosureAssigneeCount(countryfilterValue : string, fromDateValue : string, toDateValue : string) : Map<string, number>{
          let array =  this.incident.filter(f => f.assigned_to != null && f.status == "Resolved"  && f.day_closure != null);
          let finalArray = this.GenericFilter(array,countryfilterValue,fromDateValue, toDateValue);
          let assigneeResolvedCount = this.MapData(finalArray, Incidents.assigned_to);          

          let avgDayClosureMap = new Map<string, number>();
          finalArray.forEach(element => {                    
               if(!avgDayClosureMap.has(element.assigned_to)){ 
                    let days : number = Math.round(Number(element.day_closure));
                    avgDayClosureMap.set(element.assigned_to, days);
              }else
              {
                 let value = avgDayClosureMap.get(element.assigned_to);   
                 value = value + Math.round(Number(element.day_closure));
                 avgDayClosureMap.set(element.assigned_to, value);
              } 
           }); 
         
           for (const [key, value] of assigneeResolvedCount.entries())
           {
               let assigneeSum = avgDayClosureMap.get(key); 
               let avgValue = Math.round(assigneeSum/value);
               avgDayClosureMap.set(key, avgValue);
           }        
        
           return avgDayClosureMap;
     }
}

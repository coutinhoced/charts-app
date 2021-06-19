import { IfStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../Shared/Services/Incident.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  title = 'charts-app';
  countriesList : string[] = this.incidentService.GetCountriesDropDownList();      
  datepickerModel : any;
  constructor(private incidentService: IncidentService) { }

  ngOnInit(): void {
  }

  onCountiresChanged(event : any){  
    let  selectedCountry =  event.target.value;
    this.incidentService.CountryChanged(selectedCountry);
  }

  onDateChanged(event : any){    
    debugger;
    if(event == null){
      this.incidentService.DateChanged("", "");
      return;
    }
    let dt = event;
    let fromDate  = dt[0];
    let toDate  = dt[1];

    if(fromDate != null && fromDate != ""  && toDate != null && toDate != ""  ){
      if(fromDate.toDateString() != "Invalid date" && toDate.toDateString() != "Invalid date"){       
        this.incidentService.DateChanged(fromDate.toDateString(),toDate.toDateString());
      }     
    }
    else
    {
      this.incidentService.DateChanged("", "");
    }
  }
 

}

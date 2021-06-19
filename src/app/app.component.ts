import { Component, OnInit, Input } from '@angular/core';
import { IncidentService } from './Shared/Services/Incident.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'charts-app'; 
  constructor(private incidentService: IncidentService){
  }

  ngOnInit(){     
  }
  
  
  
}

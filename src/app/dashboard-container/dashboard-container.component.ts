import { Component, OnInit } from '@angular/core';
import{ Charts, ChartsComponents, ChartTypes } from '../Shared/incident-data.model';
import  * as UserData  from '../Shared/UserData/user-data.json';

@Component({
  selector: 'app-dashboard-container',
  templateUrl: './dashboard-container.component.html',
  styleUrls: ['./dashboard-container.component.css']
})
export class DashboardContainerComponent implements OnInit {
  userData : Charts[] = [];
  chartData : ChartTypes[] = [];

  constructor() {    
    this.userData =  (UserData as any).default      
                      .filter(f => f.email == "cedric.coutinho@ust-global.com");          
    this.chartData = this.userData[0].Charts.filter(f => f.Visible == true);
   
  }

  ngOnInit(): void {
        
  }

}

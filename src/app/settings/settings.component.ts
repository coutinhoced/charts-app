import { Component, Input, OnInit } from '@angular/core';
import  * as UserData  from '../Shared/UserData/user-data.json';
import { Charts } from '../Shared/incident-data.model';
import {Router} from '@angular/router';
import { IncidentService } from '../Shared/Services/Incident.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {
  columnDefs : any[] = [];
  rowData : any[] = [];
  userData : Charts[] = [];
  datepickerModel : any;
  countriesList : string[] = this.incidentService.GetCountriesDropDownList(); 

  constructor(private router: Router, private incidentService: IncidentService) { 
    this.userData =  (UserData as any).default      
                      .filter(f => f.email == "cedric.coutinho@ust-global.com");                                  
  }                 
 
  ngOnInit(): void {   
    this.BindUserDataGrid();
  }

  onShowDashBoard()  {
    this.router.navigate(['/dashboard']);
  }

  Changed(event : Event){  
    if(Object(event).colDef.field == "display"){        
        let parentId : number = Object(event).data.Id;
        let chartId : number = Object(event).data.ChartId;
        let visible : boolean =  !Object(event).data.display;

        for (var i = 0; i < this.userData.length; i++) {                                     
          for (var x = 0; x < this.userData[i].Charts.length ; x++){               
              if(this.userData[i].Charts[x].ChartId ==  chartId){
                this.userData[i].Charts[x].Visible =visible;                
              }
          }               
        }        
        this.BindUserDataGrid();
    }
    else
    {
      return;
    }
  }
 
  BindUserDataGrid(){   
    debugger;
    let data = this.userData;
    let rowData = [];   
    data.forEach(element => {       
        element.Charts.forEach(ch => {
          rowData.push({ 
                         Id : element.id,
                         Chart : ch.name, 
                         display : ch.Visible,
                         componentName : ch.ComponentName,
                         ChartId : ch.ChartId})                           
        })                
    });


    this.columnDefs = [
      { headerName: 'Id', field: 'Id', hide: true,  suppressColumnsToolPanel: true },
      { headerName: 'Charts', field: 'Chart', resizable: false, width: 350  },
      { headerName: 'Display', width: 100,
        field: 'display',         
        editable:false,
          cellRenderer: function(params) { 
            var input = document.createElement('input');
            input.type="checkbox";
            input.checked=params.value;
            // input.addEventListener('click',  function (event) {
            //   params.value=!params.value;       
            //   debugger;
            // });
            return input;
        }
      },
      {headerName: 'ComponentName', field: 'componentName', hide: true,  suppressColumnsToolPanel: true },     
      {headerName: 'ChartId', field: 'ChartId', hide: true,  suppressColumnsToolPanel: true }     
      
   ];

    this.rowData = rowData;
  } 
}

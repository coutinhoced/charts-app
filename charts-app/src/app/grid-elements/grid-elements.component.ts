import { Component, OnInit } from '@angular/core';
import { IncidentService } from '../Shared/Services/Incident.service';


@Component({
  selector: 'app-grid-elements',
  templateUrl: './grid-elements.component.html',
  styleUrls: ['./grid-elements.component.css']
})
export class GridElementsComponent implements OnInit {

  assignedToandCreatedByData = this.incidentService.FilterByAssignedToAndCreatedBy();
  originalData = this.incidentService.incident.filter(f => f.created_by != null && f.assigned_to != null);

  constructor(private incidentService: IncidentService) { }
  rowDetailsData : any[] = []


  ngOnInit(): void {      

  }  

  AssignRowData(){
    debugger;

    this.originalData.forEach(element => {
      this.rowDetailsData.push({Assignee : element.assigned_to, Owner :  element.created_by, Date : element.start_date});
    });  
    
    return this.rowDetailsData;
  }



  columnDefs = [
    { field: 'Assignee', rowGroup : true, sortable: true, filter: true},
    { field: 'Owner' }, 
    { field: 'Date'}  
 ];

  //  rowData = [
  //   { Assignee: 'Cedric', Owner: 'Jeniger' },
  //   { Assignee: 'Ford', Owner: 'Mondeo',  },
  //   { Assignee: 'Porsche', Owner: 'Boxter' }
  // ];

  rowData = this.AssignRowData();
  


}

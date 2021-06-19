import { ExpressionService } from 'ag-grid-community';

  export class   Incident {
    constructor(public id: number,
      public incident: string,
      public status: string,
      public actual_status: any,
      public assigned_to: string,
      public created_by: string,
      public start_date: string,
      public country: string,
      public cricality: string,
      public csc_range: string,
      public day_closure: string,
      public dollar_impact: any,
      public end_date: string,
      public geo: string,
      public incident_sub_class: string,
      public incident_type: string,
      public member: string,
      public mon_year: string,
      public  program: string,
      public sla_ok: string,
      public sla_range: string,
      public  user: string,
      public ww: string)
      {
                     


      }    
  }

  export enum Incidents{
    status,
    country,
    incident_type,
    mon_year,  
    actual_status,
    assigned_to,
    created_by,
    dollar_impact,
    start_date,
    geo
  }

  export enum ChartsComponents
  {    
    DoughnutChartComponent,
    LineChartComponent,
    PolarAreaChartComponent,
    RadarChartComponent
  }

  export class Charts {
    constructor(public id: number,
      public name: string,
      public email: string,   
      public Charts: ChartTypes[])
      {                    


      }    
  }

 export class ChartTypes{
    constructor(public ChartId: number,
      public name: string,
      public ComponentName: string,  
      public Visible : boolean)
      {                    


      } 
  }

 export interface DateRanges{
    fDate :string,
    tDate :string
}
  
 

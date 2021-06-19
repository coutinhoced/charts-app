import { 
    Directive, 
    Component, 
    ComponentFactory, 
    OnChanges, 
    Input, 
    ViewContainerRef,
    Compiler,
    ComponentFactoryResolver
   } from '@angular/core';
import { TicketstatusChartComponent } from '../ticketstatus-chart/ticketstatus-chart.component';
import { BarChartComponent } from '../bar-chart/bar-chart.component';
import { RadarChartComponent } from '../radar-chart/radar-chart.component';
import { LineChartComponent } from '../line-chart/line-chart.component';
import { PolarAreaChartComponent } from '../polar-area-chart/polar-area-chart.component';
import { DoughnutChartComponent } from '../doughnut-chart/doughnut-chart.component';
import { TicketassignetresolvedcountChartComponent } from '../ticketassignetresolvedcount-chart/ticketassignetresolvedcount-chart.component';
import { AvgdayclosureChartComponent } from '../avgdayclosure-chart/avgdayclosure-chart.component';
import { Type } from '@angular/core';
  
  
  @Directive({
    selector: '[ctrl-factory]'
  })
  export class ControlFactoryDirective implements OnChanges {
    componentList : any[] = [TicketstatusChartComponent,BarChartComponent, 
                             RadarChartComponent, LineChartComponent, 
                             PolarAreaChartComponent, DoughnutChartComponent, TicketassignetresolvedcountChartComponent,
                             AvgdayclosureChartComponent];

    @Input() comp: string;
    componentRef;
    init = false;
  
    constructor(private vcRef: ViewContainerRef, private resolver: ComponentFactoryResolver) {
    }
  
    ngOnChanges() {    
      if (!this.comp || this.init) return;             
      var factoryClass = <Type<any>>this.componentList.find((x: any) => x.name === this.comp);
      const factory = this.resolver.resolveComponentFactory(factoryClass);
      const compRef = this.vcRef.createComponent(factory);    
  
      if (this.componentRef) {
        this.componentRef.destroy();
      }
  
      this.componentRef = compRef;
      this.init = true;
    }
    
    public ngOnDestroy(){
      if (this.componentRef) {
          this.componentRef.destroy();
          this.componentRef = null;
      }
    }
  }
  
  
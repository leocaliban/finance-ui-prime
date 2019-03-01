import { NgModule } from '@angular/core';
import { CommonModule, DecimalPipe } from '@angular/common';

import { PanelModule } from 'primeng/panel';
import { ChartModule } from 'primeng/chart';

import { DashboardComponent } from './dashboard/dashboard.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { CompartilhadoModule } from '../compartilhado/compartilhado.module';

@NgModule({
  imports: [
    CommonModule,
    CompartilhadoModule,
    DashboardRoutingModule,
    PanelModule,
    ChartModule
  ],
  declarations: [DashboardComponent],
  providers: [
    DecimalPipe
  ]
})
export class DashboardModule { }

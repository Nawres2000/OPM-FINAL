import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkOrdersRoutingModule } from './work-orders-routing.module';
import { WorkOrdersComponent } from "./work-orders.component"
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    WorkOrdersComponent
  ],
  imports: [
    CommonModule,
    WorkOrdersRoutingModule,
    ButtonModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class WorkOrdersModule { }

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MyWorkOrdersRoutingModule } from './my-work-orders-routing.module';
import { MyWorkOrdersComponent } from './my-work-orders.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';


@NgModule({
  declarations: [MyWorkOrdersComponent],
  imports: [
    CommonModule,
    MyWorkOrdersRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule,
    ButtonModule,
  ]
})
export class MyWorkOrdersModule { }

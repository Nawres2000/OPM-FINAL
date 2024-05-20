import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FoldersRoutingModule } from './folders-routing.module';
import { RouterModule } from '@angular/router';
import { FoldersLayoutComponent } from 'src/app/theme/layout/folders-layout/folders-layout.component';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FoldersComponent } from './folders.component';
import { TicketsModule } from '../tickets/tickets.module';
import { WorkOrdersModule } from '../work-orders/work-orders.module';
import { FollowUpTicketsModule } from '../followup-tickets/followup-tickets.module';


@NgModule({
  declarations: [
    FoldersLayoutComponent,
    FoldersComponent
  ],
  imports: [
    CommonModule,
    FoldersRoutingModule,
    RouterModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    TicketsModule,
    WorkOrdersModule,
    FollowUpTicketsModule
  ]
})
export class FoldersModule { }

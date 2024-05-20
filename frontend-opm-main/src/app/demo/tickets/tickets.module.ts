import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TicketsRoutingModule } from './tickets-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { TicketsComponent } from './tickets.component';

@NgModule({
  declarations: [
    TicketsComponent,
  ],
  exports: [
    TicketsComponent
  ],
  imports: [
    CommonModule,
    TicketsRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
  ]
})
export class TicketsModule { }

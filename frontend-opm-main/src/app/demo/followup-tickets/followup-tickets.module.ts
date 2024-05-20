import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FollowUpTicketsRoutingModule } from './followup-tickets-routing.module';
import { DialogModule } from 'primeng/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FollowUpTicketsComponent } from './followup-tickets.component';

@NgModule({
  declarations: [
    FollowUpTicketsComponent,
  ],
  exports: [
    FollowUpTicketsComponent
  ],
  imports: [
    CommonModule,
    FollowUpTicketsRoutingModule,
    DialogModule,
    ReactiveFormsModule,
    FormsModule,
    ConfirmDialogModule,
  ]
})
export class FollowUpTicketsModule { }

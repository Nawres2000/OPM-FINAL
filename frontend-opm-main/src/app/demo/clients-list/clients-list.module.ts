import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ClientsListRoutingModule } from './clients-list-routing.module';
import { ClientsListComponent } from './clients-list.component';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';


@NgModule({
  declarations: [
    ClientsListComponent
  ],
  imports: [
    CommonModule,
    ClientsListRoutingModule,
    ConfirmDialogModule,
    ReactiveFormsModule,
    FormsModule,
    DialogModule
  ]
})
export class ClientsListModule { }

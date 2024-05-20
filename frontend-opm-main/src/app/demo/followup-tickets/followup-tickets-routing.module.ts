import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FollowUpTicketsComponent } from './followup-tickets.component';

const routes: Routes = [
  {
    path: "follow-up/:followUpId",
    component: FollowUpTicketsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FollowUpTicketsRoutingModule { }

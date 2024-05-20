import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TechnicianLayoutComponent } from 'src/app/theme/layout/technician-layout/technician-layout.component';
import { WorkOrdersAssignedComponent } from './work-orders-assigned.component';

const routes: Routes = [
  {
    path: "",
    component: TechnicianLayoutComponent,
    children: [
      {
        path: "",
        component: WorkOrdersAssignedComponent,
        data: {
          animationState: 'work-orders'
        }
      },
      {
        path: "",
        loadChildren: () => import('../tickets/tickets.module').then(m => m.TicketsModule),
        data: {
          animationState: 'tickets'
        }
      },
      {
        path: "",
        loadChildren: () => import('../followup-tickets/followup-tickets.module').then(m => m.FollowUpTicketsModule),
        data: {
          animationState: 'followup-tickets'
        }
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class WorkOrdersAssignedRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MyWorkOrdersComponent } from './my-work-orders.component';

const routes: Routes = [{
  path: "",
  component: MyWorkOrdersComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MyWorkOrdersRoutingModule { }

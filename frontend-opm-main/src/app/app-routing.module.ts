import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminComponent } from './theme/layout/admin/admin.component';
import { AuthGuard } from './guards/auth.guard';
import { LoginGuard } from './guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () => import('./demo/home/home.module').then(m => m.HomeModule),
      },
      {
        path: 'clients-list',
        loadChildren: () => import('./demo/clients-list/clients-list.module').then(m => m.ClientsListModule),
      },
      {
        path: 'employers-list',
        loadChildren: () => import('./demo/employers-list/employers-list.module').then(m => m.EmployersListModule),
      },
      {
        path: "folders",
        loadChildren: () => import('./demo/folders/folders.module').then(m => m.FoldersModule)
      },
      {
        path: "my-work-orders",
        loadChildren: () => import('./demo/my-work-orders/my-work-orders.module').then(m => m.MyWorkOrdersModule)
      },
      {
        path: "work-orders-assigned",
        loadChildren: () => import('./demo/work-orders-assigned/work-orders-assigned.module').then(m => m.WorkOrdersAssignedModule)
      },
      {
        path: "profile",
        loadChildren: () => import('./demo/profile/profile.module').then(m => m.ProfileModule)
      }
    ]
  },
  {
    path: 'auth',
    loadChildren: () => import('./demo/authentication/authentication.module').then(m => m.AuthenticationModule),
    canActivate: [LoginGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

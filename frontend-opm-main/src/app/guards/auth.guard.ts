import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiService } from "../services/api.service"

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private router: Router) { }
  canActivate(): boolean {
    if (!!sessionStorage.getItem('accessToken') && !!sessionStorage.getItem('refreshToken')) {
      return true;
    }
    this.router.navigate(['/auth/signin']);
    return false;
  }
}

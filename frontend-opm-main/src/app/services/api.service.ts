// api.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private http: HttpClient) { }

  signIn(credentials: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/login`, credentials);
  }
  signUp(userData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/register`, userData);
  }
  changePassword(passwordData: any): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/change-password`, passwordData);
  }
  resetPassword(email: string): Observable<any> {
    return this.http.post<any>(`${environment.apiUrl}/reset-password`, { email });
  }


}

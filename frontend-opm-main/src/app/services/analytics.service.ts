import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  constructor(private http: HttpClient) { }

  // ADMIN
  countUsersByAuthority(authority: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countUsersByAuthority/${authority}`);
  }

  countContracts(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countContracts`);
  }

  countEmployees(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countEmployees`);
  }

  countUnhandledWorkOrder(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countUnhandledWorkOrder`);
  }

  countAllTickets(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countAllTiket`);
  }

  countWorkOrders(): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countWorkOrders`);
  }

  countUnhandledWorkOrderByClientIdAndStatus(clientId: string, status?: string): Observable<any> {
    const url = `${environment.apiUrl}/count/countUnhandledWorkOrderByClientId/${clientId}/${status || ''}`;
    return this.http.get(url);
  }

  countWorkOrdersBayClientIdAndStatus(clientId: string, status: string): Observable<any> {
    const url = `${environment.apiUrl}/count/countWorkOrdersBayClintIdStatus/${clientId}/${status}`;
    return this.http.get(url);
  }

  countWorkOrderByEmployeeId(employeeId: string, status?: string): Observable<any> {
    const url = `${environment.apiUrl}/count/countWorkOrderByEmployeeId/${employeeId}/${status || ''}`;
    return this.http.get(url);
  }

  countTicketsByEmployeeId(employeeId?: string): Observable<any> {
    const url = `${environment.apiUrl}/count/countTicketsByEmployeeId/${employeeId || ''}`;
    return this.http.get(url);
  }

  countWorkOrderByStatus(status: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countWorkOrderByStatus/${status}`);
  }

  countUnhandledWorkOrderByClientId(clientId: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countUnhandledWorkOrderBayClient/${clientId}`);
  }

  countAllWorkOrdersByClient(id: string): Observable<any> {
    return this.http.get(`${environment.apiUrl}/count/countAllWorekOrderBayClient/${id}`);
  }

}

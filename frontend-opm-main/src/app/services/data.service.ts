import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  // CLIENTS
  getAllClients() {
    return this.http.get(`${environment.apiUrl}/client/all`);
  }

  updateClient(client: any) {
    return this.http.put(`${environment.apiUrl}/client/updateClient`, client);
  }

  getClientById(id: string) {
    return this.http.get(`${environment.apiUrl}/client/getClientById/${id}`);
  }

  changeClientStatus(email: string, valid: boolean) {
    return this.http.put(`${environment.apiUrl}/client/updateClientValidity`, { email: email, valid: valid });;
  }

  deleteClient(email: string) {
    return this.http.delete(`${environment.apiUrl}/client/deleteClient`, { params: { email: email } });;
  }

  // TECHNICIANS
  getAllTechnicians() {
    return this.http.get(`${environment.apiUrl}/employee/all`);
  }

  updateTechnician(employee: any) {
    return this.http.put(`${environment.apiUrl}/employee/updateEmployee`, employee);
  }

  getTechnicianById(id: string) {
    return this.http.get(`${environment.apiUrl}/employee/getEmployeeById/${id}`);
  }

  changeTechnicianStatus(email: string, valid: boolean) {
    return this.http.put(`${environment.apiUrl}/employee/updateTechnicianValidity`, { email: email, valid: valid });;
  }

  validateTechnician(email: string) {
    return this.http.put(`${environment.apiUrl}/employee/validateEmployee`, { email: email, valid: true });;
  }

  deleteTechnician(email: string) {
    return this.http.delete(`${environment.apiUrl}/employee/deleteEmployee`, { params: { email: email } });;
  }

  // FOLDERS
  getAllFolders() {
    return this.http.get(`${environment.apiUrl}/folder/all`);
  }

  getFolderById(id: string) {
    return this.http.get(`${environment.apiUrl}/folder/${id}`);
  }

  // WORK ORDERS
  getWorkOrdersByClientId(id: string) {
    return this.http.get(`${environment.apiUrl}/workOrder/getWorkOrderByClientId/${id}`);
  }

  getAllWorkOrders() {
    return this.http.get(`${environment.apiUrl}/workOrder/all`);
  }

  getWorkOrderByEmployeeId(id: string) {
    return this.http.get(`${environment.apiUrl}/workOrder/getWorkOrderByEmployeeId/${id}`);
  }

  getWorkOrdersById(id: string, authority: string) {
    return this.http.get(`${environment.apiUrl}/workOrder/getWorkOrderById/${id}/${authority}`);
  }

  createWorkOrder(data: FormData) {
    return this.http.post(`${environment.apiUrl}/workOrder/createWorkOrder`, data);
  }

  assignTechnician(id: string, techId: string) {
    return this.http.put(`${environment.apiUrl}/workOrder/assignTechnician/${id}/${techId}`, null);
  }

  updateStatus(id: string, status: string) {
    return this.http.put(`${environment.apiUrl}/workOrder/updateStatus/${id}/${status}`, null);
  }

  updateWorkOrder(data: any) {
    return this.http.put(`${environment.apiUrl}/workOrder/updateWorkOrder`, data);
  }

  deleteWorkOrder(id: string) {
    return this.http.delete(`${environment.apiUrl}/workOrder/deleteWorkOrder/${id}`);
  }

  recallWorkOrder(id: string) {
    return this.http.post(`${environment.apiUrl}/workOrder/addFollowUp`, { id: id });
  }

  // TICKETS
  getTicketsByWorkOrderId(id: string) {
    return this.http.get(`${environment.apiUrl}/ticket/getTicketByWorkOrderId/${id}`);
  }

  getAllTickets() {
    return this.http.get(`${environment.apiUrl}/ticket/all`);
  }

  getTicketsByFollowUpId(id: string) {
    return this.http.get(`${environment.apiUrl}/ticket/getTicketByFollowUpId/${id}`);
  }

  addTicket(data: FormData) {
    return this.http.post(`${environment.apiUrl}/workOrder/addTicket`, data);
  }

  addTicketFollowUp(data: FormData) {
    return this.http.post(`${environment.apiUrl}/followUp/addTicket`, data);
  }

  deleteTicket(woId: string, tId: string) {
    return this.http.delete(`${environment.apiUrl}/workOrder/${woId}/removeTicket/${tId}`);
  }

  deleteFile(fileId: string, ticketId: string) {
    return this.http.delete(`${environment.apiUrl}/ticket/ticketRemoveFile/${fileId}/${ticketId}`);
  }

  updateTicketStatus(id: string, status: string) {
    return this.http.put(`${environment.apiUrl}/ticket/updateTicketStatus/${id}/${status}`, null);
  }

  // CONTRACT
  updateContract(data: any) {
    return this.http.put(`${environment.apiUrl}/contract/updateContract`, data);
  }

  // COMMON
  changePassword(id: string, data: any) {
    return this.http.put(`${environment.apiUrl}/user/change-password/${id}`, data);
  }

  // FOLLOW UPS
  getFollowUpsByClientId(id: string) {
    return this.http.get(`${environment.apiUrl}/followUp/getFollowUpsByClientId/${id}`);
  }

  getFollowUpByEmployeeId(id: string) {
    return this.http.get(`${environment.apiUrl}/followUp/getFollowUpsByEmployeeId/${id}`);
  }

  getFollowUpById(id: string) {
    return this.http.get(`${environment.apiUrl}/followUp/getFollowUpById/${id}`);
  }

  assignTechnicianToFollowUp(id: string, techId: string) {
    return this.http.put(`${environment.apiUrl}/followUp/assignTechnician/${id}/${techId}`, null);
  }

  updateFollowUpStatus(id: string, status: string) {
    return this.http.put(`${environment.apiUrl}/followUp/updateStatus/${id}/${status}`, null);
  }

  updateFollowUp(data: any) {
    return this.http.put(`${environment.apiUrl}/followUp/updateFollowUp`, data);
  }

  deleteFollowUp(id: string) {
    return this.http.delete(`${environment.apiUrl}/followUp/deleteFollowUp/${id}`);
  }

}

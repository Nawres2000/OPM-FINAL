import { Component, OnInit } from '@angular/core';
import { MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-work-orders-assigned',
  templateUrl: './work-orders-assigned.component.html',
  styleUrls: ['./work-orders-assigned.component.scss']
})
export class WorkOrdersAssignedComponent implements OnInit {
  isLoading = true
  workOrders: any[] = []
  followUps: any[] = []

  constructor(private dataService: DataService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.getWorkOrderByEmployeeId(this.employeeId)
    this.getFollowUpsByEmployeeId(this.employeeId)
  }

  get employeeId() {
    return sessionStorage.getItem("_id")
  }

  getWorkOrderByEmployeeId(id: string) {
    this.dataService.getWorkOrderByEmployeeId(id).subscribe((response: any) => {
      this.workOrders = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  getFollowUpsByEmployeeId(id: string) {
    this.dataService.getFollowUpByEmployeeId(id).subscribe((response: any) => {
      this.followUps = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }
}

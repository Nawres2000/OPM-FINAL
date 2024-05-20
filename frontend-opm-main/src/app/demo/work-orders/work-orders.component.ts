import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DataService } from 'src/app/services/data.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-work-orders',
  templateUrl: './work-orders.component.html',
  styleUrls: ['./work-orders.component.scss']
})
export class WorkOrdersComponent implements OnInit {
  recallForm: FormGroup
  isLoading = true
  workOrders: any[] = []
  expiredWorkOrders: any[] = []
  followUps: any[] = []
  folder: any = {}
  folderId: string = ""
  selectedWorkOrder: any | undefined = undefined
  displayShowModal = false
  displayRecallModal = false
  displayAssignTechModal = false
  apiUrl: string = environment.apiUrl

  isRecalling = false

  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService, private confirmService: ConfirmationService, private fb: FormBuilder) {
    this.recallForm = this.fb.group({
      workOrderId: ["", Validators.required]
    })
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(params => {
        this.folderId = params.get('folderId')!
      });
    this.getFolderById(this.folderId)
  }

  getFolderById(id: string) {
    this.dataService.getFolderById(id).subscribe((response: any) => {
      this.folder = response.rows
      this.getWorkOrdersByClientId(response.rows.clientId)
      this.getFollowUpsByClientId(response.rows.clientId)
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  getWorkOrdersByClientId(id: string) {
    this.isLoading = true
    this.dataService.getWorkOrdersByClientId(id).subscribe((response: any) => {
      this.workOrders = response.rows
      this.expiredWorkOrders = response.rows.filter((workOrder: any) => workOrder.status === "Expired")
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  getFollowUpsByClientId(id: string) {
    this.isLoading = true
    this.dataService.getFollowUpsByClientId(id).subscribe((response: any) => {
      console.log(response)
      this.followUps = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  selectWorkOrder(id: string) {
    this.selectedWorkOrder = this.workOrders.find(wo => wo._id === id)
    if (this.selectWorkOrder) this.displayShowModal = true
  }

  deleteWorkOrder(event: MouseEvent, id: string) {
    event.stopPropagation()
    event.preventDefault()
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteWorkOrder(id).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getWorkOrdersByClientId(this.folder.clientId)
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      }
    })
  }

  deleteFollowUp(event: MouseEvent, id: string) {
    event.stopPropagation()
    event.preventDefault()
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteFollowUp(id).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getFollowUpsByClientId(this.folder.clientId)
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      }
    })
  }

  recallWO() {
    if (!this.recallForm.valid) {
      this.recallForm.markAllAsTouched()
      return
    }
    console.log(this.recallForm.value)
    this.isRecalling = true
    this.dataService.recallWorkOrder(this.recallForm.value.workOrderId).subscribe((response: any) => {
      console.log(response)
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Recalled successfully.' });
      this.isRecalling = false
      this.displayRecallModal = false
      this.getWorkOrdersByClientId(this.folder.clientId)
      this.getFollowUpsByClientId(this.folder.clientId)
    }, (error) => {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      this.isRecalling = false
    })
  }
}

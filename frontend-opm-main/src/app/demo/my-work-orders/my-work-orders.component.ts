import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-my-work-orders',
  templateUrl: './my-work-orders.component.html',
  styleUrls: ['./my-work-orders.component.scss']
})
export class MyWorkOrdersComponent implements OnInit {
  form: FormGroup;
  editForm: FormGroup;

  isLoading = true
  isEditing = false

  workOrders: any[] = []
  displayAddModal = false
  displayShowModal = false
  displayEditModal = false
  selectedFiles: File[] = undefined
  isAdding = false
  selectedWorkOrder: any | undefined = undefined
  apiUrl = environment.apiUrl

  constructor(private fb: FormBuilder, private dataService: DataService, private messageService: MessageService, private confirmationService: ConfirmationService) {
    this.form = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      files: ['']
    });
    this.editForm = this.fb.group({
      _id: [''],
      title: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  get clientId() {
    return sessionStorage.getItem("_id")
  }

  ngOnInit(): void {
    this.getWorkOrdersByClientId(this.clientId)
  }

  getWorkOrdersByClientId(id: string) {
    this.isLoading = true
    this.dataService.getWorkOrdersByClientId(id).subscribe((response: any) => {
      this.workOrders = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  addWorkOrder() {
    if (this.isAdding) return
    if (!this.form.valid) {
      this.form.markAllAsTouched()
      return
    }
    const formData = new FormData();
    formData.append('title', this.form.value.title);
    formData.append('description', this.form.value.description);
    formData.append('finishDate', this.form.value.finishDate);
    formData.append('clientId', this.clientId);
    if (this.selectedFiles) {
      for (let file of this.selectedFiles) {
        formData.append('files', file);
      }
    }
    this.isAdding = true
    this.dataService.createWorkOrder(formData).subscribe((response: any) => {
      this.isAdding = false
      this.resetForm()
      this.messageService.add({ severity: 'success', summary: "Success", detail: "Work Order created successfully" })
      this.getWorkOrdersByClientId(this.clientId)
      this.displayAddModal = false
    }, error => {
      this.isAdding = false
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  onFileSelect(event: any) {
    const files: File[] = event.target.files;
    this.selectedFiles = files;
    this.form.get('files').setValue(files);
  }

  resetForm() {
    this.form.reset();
    this.selectedFiles = [];
  }

  selectWorkOrder(id: string) {
    this.selectedWorkOrder = this.workOrders.find(wo => wo._id === id)
    if (this.selectWorkOrder) this.displayShowModal = true
  }

  validate() {
    this.confirmationService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.displayShowModal = false
        this.dataService.updateStatus(this.selectedWorkOrder._id, "Valid").subscribe((response: any) => {
          this.getWorkOrdersByClientId(this.clientId)
          this.messageService.add({ severity: 'success', summary: "Success", detail: "Work Order updated successfully" })
        }, error => {
          this.displayShowModal = true
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        })
      }
    })
  }

  editWorkOrder() {
    if (this.isEditing) return
    if (!this.editForm.valid) {
      this.editForm.markAllAsTouched()
      return
    }
    this.isEditing = true
    this.dataService.updateWorkOrder(this.editForm.value).subscribe((response: any) => {
      this.messageService.add({ severity: 'success', summary: "Success", detail: "Work Order updated successfully" })
      this.displayEditModal = false
      this.isEditing = false
      this.getWorkOrdersByClientId(this.clientId)
    }, error => {
      this.isEditing = false
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  showEditModal(event: MouseEvent, id: string) {
    event.stopPropagation()
    event.preventDefault()
    this.displayEditModal = true
    let workOrder = this.workOrders.find(wo => wo._id === id)
    if (workOrder) {
      this.editForm.patchValue({
        _id: workOrder._id,
        title: workOrder.title,
        description: workOrder.description
      })
    }
  }

  parseFileName(value: string): string {
    if (value.length < 20) return value
    return value.substring(0, 10) + " ... " + value.substring(value.length - 10, value.length);
  }
}

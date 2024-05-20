import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApiService } from 'src/app/services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-clients-list',
  templateUrl: './clients-list.component.html',
  styleUrls: ['./clients-list.component.scss']
})
export class ClientsListComponent implements OnInit {
  contractForm: FormGroup

  clients: any[] = []
  clientsBackup: any[] = []
  isLoading = true
  isEditing = false

  displayEditContractModal = false

  searchQuery: string = ""

  constructor(private service: DataService, private messageService: MessageService, private apiService: ApiService, private dataService: DataService, private confirmService: ConfirmationService, private fb: FormBuilder) {
    this.contractForm = this.fb.group({
      _id: [""],
      type: ["", Validators.required],
      SLA: [null, [Validators.required, Validators.min(0.1)]],
    })
  }

  ngOnInit(): void {
    this.getAllClients();
  }

  getAllClients() {
    this.isLoading = true
    this.service.getAllClients().subscribe((response: any) => {
      this.clients = this.clientsBackup = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  deleteUser(email: string): void {
    this.confirmService.confirm({
      key: "clientsConfirm",
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteClient(email).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getAllClients()
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        });
      }
    })
  }

  setClientStatus(email: string, msg: string, status: boolean) {
    this.confirmService.confirm({
      key: "clientsConfirm",
      message: `Are you sure that you want to ${msg} this client?`,
      accept: () => {
        this.dataService.changeClientStatus(email, status).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Changed account status successfully.' });
          this.getAllClients()
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        });
      }
    })
  }

  search() {
    if (this.searchQuery === "") this.clients = this.clientsBackup
    this.clients = this.clientsBackup.filter(cl => cl.email.includes(this.searchQuery))
  }

  clearSearch() {
    this.clients = this.clientsBackup
    this.searchQuery = ""
  }

  showEditContractModal(email: string) {
    let client = this.clients.find(cl => cl.email === email)
    if (client) {
      this.contractForm.patchValue({
        _id: client.contractId._id,
        type: client.contractId.type || "",
        SLA: client.contractId.SLA || null
      })
      this.displayEditContractModal = true
    }
  }

  clearFormsData() {
    this.contractForm.reset()
  }

  updateContract() {
    if (this.isEditing) return
    if (!this.contractForm.valid) {
      this.contractForm.markAllAsTouched()
      return
    }
    this.isEditing = true
    this.dataService.updateContract(this.contractForm.value).subscribe(response => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Updated successfully.' });
      this.getAllClients()
      this.displayEditContractModal = false
      this.clearFormsData()
      this.isEditing = false
    }, error => {
      this.isEditing = false
      this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
    });
  }
}

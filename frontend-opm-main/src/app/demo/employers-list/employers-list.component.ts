import { Component, OnInit } from '@angular/core';
import { DataService } from '../../services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-employers-list',
  templateUrl: './employers-list.component.html',
  styleUrls: ['./employers-list.component.scss']
})
export class EmployersListComponent implements OnInit {
  technicians: any[] = []
  techniciansBackup: any[] = []

  isLoading = true

  searchQuery: string = ""

  constructor(private dataService: DataService, private messageService: MessageService, private confirmService: ConfirmationService,) { }

  ngOnInit(): void {
    this.getAllTechnicians();
  }

  getAllTechnicians() {
    this.dataService.getAllTechnicians().subscribe((response: any) => {
      this.technicians = this.techniciansBackup = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  deleteUser(email: string): void {
    this.confirmService.confirm({
      key: "techniciansConfirm",
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteTechnician(email).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getAllTechnicians()
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        });
      }
    })
  }

  setTechnicianStatus(email: string, msg: string, status: boolean) {
    this.confirmService.confirm({
      key: "techniciansConfirm",
      message: `Are you sure that you want to ${msg} this technician?`,
      accept: () => {
        this.dataService.changeTechnicianStatus(email, status).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Changed account status successfully.' });
          this.getAllTechnicians()
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        });
      }
    })
  }

  search() {
    if (this.searchQuery === "") this.technicians = this.techniciansBackup
    this.technicians = this.techniciansBackup.filter(tec => tec.email.includes(this.searchQuery))
  }

  clearSearch() {
    this.technicians = this.techniciansBackup
    this.searchQuery = ""
  }
}

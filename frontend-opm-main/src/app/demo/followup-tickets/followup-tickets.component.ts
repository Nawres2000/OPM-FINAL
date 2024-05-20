import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../../services/data.service';
import { ConfirmationService, MessageService } from 'primeng/api';
import { environment } from 'src/environments/environment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-followup-tickets',
  templateUrl: './followup-tickets.component.html',
  styleUrls: ['./followup-tickets.component.scss']
})
export class FollowUpTicketsComponent implements OnInit {
  isLoading = true
  isTicketsLoading = true
  followUp: any | undefined = {}
  followUpId: string = ""
  technicians: any[] = []
  tickets: any[] = []
  apiUrl: string = environment.apiUrl

  displayAssignTechModal = false
  displayAddTicketModal = false
  displayShowTicketModal = false

  isAdding = false
  assignTechForm: FormGroup
  ticketForm: FormGroup
  selectedFiles: File[] | undefined = undefined
  selectedTicket: any | undefined = {}

  constructor(private route: ActivatedRoute, private dataService: DataService, private messageService: MessageService, private fb: FormBuilder, private confirmService: ConfirmationService) {
    this.assignTechForm = this.fb.group({
      employeeId: ["", Validators.required]
    })
    this.ticketForm = this.fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      files: ['']
    });
  }

  get userRole() {
    return sessionStorage.getItem("authority")
  }

  get employeeId() {
    return sessionStorage.getItem("_id")
  }

  ngOnInit(): void {
    this.route
      .paramMap
      .subscribe(params => {
        this.followUpId = params.get('followUpId')!
      });
    this.getFollowUpById(this.followUpId)
    this.getAllTechnicians()
  }

  getFollowUpById(id: string) {
    this.dataService.getFollowUpById(id).subscribe((response: any) => {
      this.followUp = response.rows
      if (this.userRole === "technician" && this.followUp.status === "Waiting") {
        this.dataService.updateFollowUpStatus(id, "In progress").subscribe((response: any) => {
          this.followUp.status = "In progress"
          this.isLoading = false
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        })
      }
      this.isLoading = false
      this.getTicketsByFollowUpId(this.followUpId)
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  getTicketsByFollowUpId(id: string) {
    this.dataService.getTicketsByFollowUpId(id).subscribe((response: any) => {
      this.tickets = response.rows
      this.isTicketsLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  assignTechnician() {
    this.dataService.assignTechnicianToFollowUp(this.followUpId, this.assignTechForm.value.employeeId).subscribe((response: any) => {
      this.isLoading = true
      this.getFollowUpById(this.followUpId)
      this.messageService.add({ severity: 'success', summary: "Error", detail: "Assigned a technician to this work order" })
      this.displayAssignTechModal = false
      this.assignTechForm.reset()
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  getAllTechnicians() {
    this.dataService.getAllTechnicians().subscribe((response: any) => {
      this.technicians = response.rows
      this.isLoading = false
    }, error => {
      this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
    })
  }

  addTicket() {
    if (this.ticketForm.valid) {
      const formData = new FormData();
      formData.append('title', this.ticketForm.value.title);
      formData.append('description', this.ticketForm.value.description);
      formData.append('employeeId', this.employeeId);
      formData.append('followUpId', this.followUpId);
      if (this.selectedFiles) {
        for (let file of this.selectedFiles) {
          formData.append('files', file);
        }
      }
      this.isAdding = true
      this.dataService.addTicketFollowUp(formData).subscribe((response: any) => {
        this.isAdding = false
        this.resetAddTicketForm()
        this.messageService.add({ severity: 'success', summary: "Success", detail: "Work Order created successfully" })
        this.getTicketsByFollowUpId(this.followUpId)
        this.displayAddTicketModal = false
      }, error => {
        this.isAdding = false
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
      })
    } else {
      this.ticketForm.markAllAsTouched()
    }
  }

  deleteTicket(event: MouseEvent, id: string, followUpId: string) {
    event.stopPropagation()
    event.preventDefault()
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteTicket(followUpId, id).subscribe(response => {
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Deleted successfully.' });
          this.getTicketsByFollowUpId(this.followUpId)
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
        })
      }
    })
  }

  onFileSelect(event: any) {
    const files: File[] = event.target.files;
    this.selectedFiles = files;
    this.ticketForm.get('files').setValue(files);
  }

  resetAddTicketForm() {
    this.ticketForm.reset();
    this.selectedFiles = [];
  }

  selectTicket(id: string) {
    this.selectedTicket = this.tickets.find(t => t._id === id)
    if (this.selectedTicket) this.displayShowTicketModal = true
  }

  closeTicket() {
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.updateTicketStatus(this.selectedTicket._id, 'Closed').subscribe((response: any) => {
          this.displayShowTicketModal = false
          this.getTicketsByFollowUpId(this.followUpId)
          this.messageService.add({ severity: 'success', summary: "Success", detail: "Ticket updated successfully" })
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        })
      }
    })
  }

  validate() {
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.updateFollowUpStatus(this.followUpId, "Done").subscribe((response: any) => {
          this.getFollowUpById(this.followUpId)
          this.messageService.add({ severity: 'success', summary: "Success", detail: "Work Order updated successfully" })
        }, error => {
          this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        })
      }
    })
  }

  deleteFileFromTicket(fileId: string, ticketId: string) {
    this.confirmService.confirm({
      message: "Are you sure?",
      accept: () => {
        this.dataService.deleteFile(fileId, ticketId)
          .pipe(take(1))
          .subscribe((response: any) => {
            this.messageService.add({ severity: 'success', summary: "Success", detail: "File deleted successfully" })
            this.getTicketsByFollowUpId(this.followUpId)
            this.displayShowTicketModal = false
          }, error => {
            this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
          })
      }
    })
  }

  parseFileName(value: string): string {
    if (value.length < 20) return value
    return value.substring(0, 10) + " ... " + value.substring(value.length - 10, value.length);
  }
}

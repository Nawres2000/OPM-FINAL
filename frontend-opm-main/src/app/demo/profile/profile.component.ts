import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { take } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  isLoading = true
  isEditingInfo = false
  isPasswordEditing = false
  userInfo: any = {}
  userEmail: string = ""
  clientForm: FormGroup
  technicianForm: FormGroup
  resetPasswordForm: FormGroup

  get clientId() {
    return sessionStorage.getItem("_id")
  }

  get authority() {
    return sessionStorage.getItem("authority")
  }

  constructor(private dataService: DataService, private messageService: MessageService, private confirmService: ConfirmationService, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      email: ['', Validators.required],
      company: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
    })
    this.technicianForm = this.fb.group({
      email: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    })
    this.resetPasswordForm = this.fb.group({
      oldPassword: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      newPassword: ["", [Validators.required, Validators.minLength(3)]]
    })
  }

  ngOnInit(): void {
    if (this.authority === "technician") {
      this.getTechnicianInformation()
    } else {
      this.getClientInformation()
    }
  }

  getClientInformation() {
    this.isLoading = true
    this.dataService.getClientById(this.clientId)
      .subscribe((response: any) => {
        console.log(response)
        this.userInfo = response.rows
        this.userEmail = this.userInfo.email
        this.patchFormValue(this.clientForm, this.userInfo)
        this.isLoading = false
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
      })
  }

  getTechnicianInformation() {
    this.isLoading = true
    this.dataService.getTechnicianById(this.clientId)
      .subscribe((response: any) => {
        this.userInfo = response.rows
        this.userEmail = this.userInfo.email
        this.patchFormValue(this.technicianForm, this.userInfo)
        this.isLoading = false
      }, error => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
      })
  }

  patchFormValue(form: FormGroup, data: any) {
    form.patchValue({ ...data })
  }

  update() {
    if (this.authority === "technician") {
      this.updateTechnician()
    } else {
      this.updateClient()
    }
  }

  updateTechnician() {
    if (!this.technicianForm.valid) {
      this.technicianForm.markAllAsTouched()
      return
    }
    this.isEditingInfo = true

    let _req = {
      email: this.userEmail,
      newEmail: this.technicianForm.value.email,
      firstName: this.technicianForm.value.firstName,
      lastName: this.technicianForm.value.lastName,
      birthDate: this.technicianForm.value.birthDate
    }

    this.dataService.updateTechnician(_req)
      .subscribe((response: any) => {
        this.userEmail = this.technicianForm.value.email
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Updated successfully" })
        this.isEditingInfo = false
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        this.isEditingInfo = false
      })
  }

  updateClient() {
    if (!this.clientForm.valid) {
      this.clientForm.markAllAsTouched()
      return
    }
    this.isEditingInfo = true

    let _req = {
      email: this.userEmail,
      newEmail: this.clientForm.value.email,
      company: this.clientForm.value.company
    }

    this.dataService.updateClient(_req)
      .subscribe((response: any) => {
        this.userEmail = this.clientForm.value.email
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Updated successfully" })
        this.isEditingInfo = false
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        this.isEditingInfo = false
      })
  }

  resetPassword() {
    if (!this.resetPasswordForm.valid) {
      this.resetPasswordForm.markAllAsTouched()
      return
    }
    if (this.resetPasswordForm.value.newPassword !== this.resetPasswordForm.value.confirmPassword) {
      this.messageService.add({ severity: "error", summary: "Error", detail: "New password and Confirm password do not match" })
      return
    }
    this.isPasswordEditing = true
    let _req = {
      oldPassword: this.resetPasswordForm.value.oldPassword,
      newPassword: this.resetPasswordForm.value.newPassword
    }
    this.dataService.changePassword(this.clientId, _req)
      .subscribe((response: any) => {
        console.log(response)
        this.resetPasswordForm.reset()
        this.isPasswordEditing = false
        this.messageService.add({ severity: 'success', summary: 'Success', detail: "Password changed successfully" })
      }, (error) => {
        this.messageService.add({ severity: 'error', summary: 'Error Message', detail: error.error.message })
        this.isPasswordEditing = false
      })
  }
}

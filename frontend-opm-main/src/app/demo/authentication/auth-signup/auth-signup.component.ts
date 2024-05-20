import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-signup',
  templateUrl: './auth-signup.component.html',
  styleUrls: ['./auth-signup.component.scss']
})
export class AuthSignupComponent {
  selectedAuthority: string = 'client';

  isSigningUp: boolean = false

  clientForm: FormGroup
  technicianForm: FormGroup

  constructor(private apiService: ApiService, private messageService: MessageService, private router: Router, private fb: FormBuilder) {
    this.clientForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      company: ['', Validators.required],
      type: ['', Validators.required],
      dateOfRegistration: ['', Validators.required],
      SLA: [null, [Validators.required, Validators.min(0.1)]],
    })
    this.technicianForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      birthDate: ['', Validators.required],
    })
  }

  signUp(form: FormGroup): void {
    if (this.isSigningUp) return
    if (form.valid) {
      if (form.value.password !== form.value.confirmPassword) {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Passwords do not match.' });
        return;
      }

      this.isSigningUp = true

      this.apiService.signUp({ ...form.value, authority: this.selectedAuthority }).subscribe(response => {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Registered successfully.' });
        this.router.navigate(['/auth/signin'])
        this.isSigningUp = false
      }, error => {
        this.isSigningUp = false
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      });
    } else {
      form.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter all fields.' });
    }
  }
}

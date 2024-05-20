import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-auth-signin',
  templateUrl: './auth-signin.component.html',
  styleUrls: ['./auth-signin.component.scss']
})
export class AuthSigninComponent {
  isLoggingIn: boolean = false
  form: FormGroup

  constructor(private apiService: ApiService, private messageService: MessageService, private router: Router, private fb: FormBuilder) {
    this.form = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  signIn(): void {
    if (this.isLoggingIn) return
    if (this.form.valid) {
      this.isLoggingIn = true

      this.apiService.signIn(this.form.value).subscribe(response => {

        sessionStorage.setItem('accessToken', response.accessToken);
        sessionStorage.setItem('refreshToken', response.refreshToken);
        sessionStorage.setItem('_id', response.payload.user._id);
        sessionStorage.setItem('authority', response.payload.user.authority);

        this.messageService.add({ severity: 'success', summary: 'Success', detail: 'User has been logged in' });
        this.router.navigate(['/home']);
      }, error => {
        this.isLoggingIn = false
        this.messageService.add({ severity: 'error', summary: 'Error', detail: error.error.message });
      })
    } else {
      this.form.markAllAsTouched();
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Please enter all fields.' });
    }
  }
}

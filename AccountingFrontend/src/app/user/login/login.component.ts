import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup=new FormGroup({});
  errorMessage: string = '';
  isProcessing = false;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {  }

  ngOnInit(): void {
    this.createForm();
  }

  createForm(): void {
    this.loginForm = this.fb.group({
      Email: ['', [Validators.required, Validators.email]],
      Password: ['', [Validators.required,Validators.minLength(6)]]
    });
  }
  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    const loginData = this.loginForm.value;
    this.isProcessing = true;
    this.authService.login(loginData).subscribe(
      (response) => {
        console.log({response})
        if (response.status) {
          const token = response.result;
          this.authService.setUserData(token);
          this.router.navigate(['/account/dashboard']);
        } else {
          this.errorMessage = response.message;
        }
      },
      (error) => {
        console.error(error);
        this.errorMessage = 'Login failed. Please try again later.';
      }
    );
  }
}

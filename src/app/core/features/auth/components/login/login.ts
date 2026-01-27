import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../../models/user.Interface';
import { NotificationService } from '../../../../services/notification-service';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;
  loginError: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef,
    private notify:NotificationService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest: LoginRequest = this.loginForm.value;
      this.authService.login(loginRequest).subscribe({
        next: (response: any) => {
          this.router.navigate(['/home']);
        },
        error: (error) => {
          if(error.status == 401){
            this.loginError = true;
          }
          else {
            console.log("inside else went wrong")
            this.notify.show("Something Went Wrong","error");
          }
          console.log(error);
          this.cdr.detectChanges();
        }
      })
    }
  }
}

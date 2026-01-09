import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';
import { LoginRequest } from '../../../../models/user.Interface';
import { TokenStorageService } from '../../../../services/token-storage-service';
@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
export class Login {
  loginForm!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router:Router,
    private tokenservice:TokenStorageService
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const loginRequest:LoginRequest = this.loginForm.value; 
      console.log('Form Data:', loginRequest);
      this.authService.login(loginRequest).subscribe({
         next:(response:any)=>{
          this.tokenservice.save(response.token);
          this.router.navigate(['/home']);          
        },
        error:(error)=>{
          console.log(error);
        }
      })
    }
  }
}

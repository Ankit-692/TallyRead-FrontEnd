import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { User } from '../../../../models/user.Interface';
import { AuthService } from '../../../../services/auth-service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {

  signupForm!: FormGroup
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.signupForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.maxLength(20)]],
      lastName: ['', [Validators.required, Validators.maxLength(20)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      retypePassword: ['', [Validators.required]]
    });

    this.retypePasswordControl.valueChanges.subscribe(() => {
      const password = this.passwordControl.value;
      const retype = this.retypePasswordControl.value;
      this.passwordsMatch = password === retype;
    });
  }

  get passwordControl() { return this.signupForm.get('password')!; }
  get retypePasswordControl() { return this.signupForm.get('retypePassword')!; }
  passwordsMatch = false;


  onSubmit() {
    if (this.signupForm.valid) {
      const user: User = this.signupForm.value;
      this.authService.register(user).subscribe({
        next: (response) => {
          console.log(response)
          this.router.navigate(['/login'])
        },
        error: (error) => {
          console.log(error);
        }
      })
    }
  }
}

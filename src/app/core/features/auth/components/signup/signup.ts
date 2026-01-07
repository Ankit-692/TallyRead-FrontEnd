import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';

@Component({
  selector: 'app-signup',
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './signup.html',
  styleUrl: './signup.scss',
})
export class Signup {
  signupForm!:FormGroup
  constructor(private fb: FormBuilder) {}

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


  onSubmit(){

  }


}

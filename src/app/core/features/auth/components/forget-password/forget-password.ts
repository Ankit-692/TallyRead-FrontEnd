import { ChangeDetectorRef, Component } from '@angular/core';
import { AuthService } from '../../../../services/auth-service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ForgetPasswordRequest } from '../../../../models/user.Interface';

@Component({
  selector: 'app-forget-pasword',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './forget-password.html',
  styleUrl: './forget-password.scss',
})
export class ForgetPassword {
  forgetPassword !: FormGroup;
  sent: boolean = false;
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private cdr: ChangeDetectorRef
  ) { }


  ngOnInit(): void {
    this.forgetPassword = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    })
  }
  requestReset() {
    if (this.forgetPassword.valid) {
      const forgetPassword: ForgetPasswordRequest = this.forgetPassword.value;
      this.authService.requestResetLink(forgetPassword).subscribe({
        next: (req => {
          this.sent = true;
          this.forgetPassword.get('email')?.setErrors({ "error": "Email Already Sent" });
          this.cdr.detectChanges();
          console.log(req)
        }),
        error: (err => {
          console.log(err)
        })
      })
    }
  }

}

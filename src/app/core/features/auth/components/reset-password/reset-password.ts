import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ResetRequest } from '../../../../models/user.Interface';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../../services/auth-service';

@Component({
  selector: 'app-reset-password',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './reset-password.html',
  styleUrl: './reset-password.scss',
})
export class ResetPassword {
  resetRequest !: FormGroup
  token: string | null = null;
  passwordMatch: boolean = true
  expired: boolean = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private authService: AuthService,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) { }
  ngOnInit(): void {
    this.resetRequest = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirm_password: ['', [Validators.required, Validators.minLength(8)]]
    });
    this.token = this.route.snapshot.queryParamMap.get('token');
    if (this.token == null) {
      this.router.navigate(['/login'])
    }
    this.resetRequest.get('confirm_password')!.valueChanges.subscribe(() => {
      const password = this.resetRequest.get('password')!.value
      const retype = this.resetRequest.get('confirm_password')!.value
      this.passwordMatch = password === retype;
    })
    console.log(this.token)
  }

  resetPassword() {
    if (!(this.resetRequest.get('password')!.value === this.resetRequest.get('confirm_password')!.value)) {
      this.passwordMatch = false;
      console.log(this.passwordMatch)
      return
    }
    if (this.resetRequest.valid && this.token != null) {
      const resetRequest: ResetRequest = this.resetRequest.value;
      this.authService.resetPassword(this.token, resetRequest)?.subscribe({
        next: ((res: any) => {
          console.log(res);
        }),
        error: ((err: any) => {
          console.log(err);
          console.log(err.error.error.includes("Expired"))
          if (err.error.error.includes("Expired")) {
            this.expired = true;
            this.passwordMatch = true;
            this.cdr.detectChanges();
          }
          console.log(err.error.error);
        })
      })
    }
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-forgot-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './forgot-password.component.html',
  styles: [],
})
export class ForgotPasswordComponent {
  forgotPassForm: any;
  isSubmitted: boolean = false;

  constructor(
    public formBuilder: FormBuilder,
    private service: AuthService,
    private router: Router,
    private toastr: ToastrService
  ) {
    this.forgotPassForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      newPassword: ['', Validators.required],
    });
  }

  onSubmit() {
    this.isSubmitted = true;
    if (this.forgotPassForm.valid) {
      this.service.resetPassword(this.forgotPassForm.value).subscribe({
        next: (res: any) => {
          this.toastr.success('Password reset successfully.', 'Success');
          this.router.navigateByUrl('/signin');
        },
        error: (err) => {
          console.error('Error during password reset:', err);
          if (err.status == 400)
            this.toastr.error('Email not found.', 'Request failed');
          else console.error('Error during password reset:', err);
        },
      });
    }
  }

  hasDisplayableError(controlName: string): Boolean {
    const control = this.forgotPassForm.get(controlName);
    return (
      Boolean(control?.invalid) &&
      (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
    );
  }
}

import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css'],
})
export class ChangePasswordComponent {
  email: string = '';
  currentPassword: string = '';
  newPassword: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    this.userService.changePassword(this.email, this.currentPassword, this.newPassword).subscribe({
      next: (response) => {
        this.toastr.success(response.message, 'Success');
        this.router.navigateByUrl('/profile');
      },
      error: (error) => {
        this.toastr.error(error.error.message, 'Error');
      }
    });
  }
}

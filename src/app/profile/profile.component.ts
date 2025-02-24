import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { UserService } from '../shared/services/user.service';
import { ToastrService } from 'ngx-toastr';
import { jwtDecode } from 'jwt-decode';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css',],
})
export class ProfileComponent implements OnInit {
  user: any = null;
  isLoading: boolean = false;
  userEmail: string = '';

  constructor(
    private userService: UserService,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUserEmail();
  }

  getUserEmail(): void {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded: any = jwtDecode(token);
        this.userEmail = decoded.email;

        if (this.userEmail) {
          this.fetchUserData();
        } else {
          this.handleInvalidSession();
        }
      } catch (error) {
        console.error('Invalid token:', error);
        this.handleInvalidSession();
      }
    } else {
      this.handleInvalidSession();
    }
  }

  handleInvalidSession(): void {
    this.toastr.error('Invalid session. Please login again.', 'Error');
    this.router.navigateByUrl('/login');
  }

  fetchUserData(): void {
    this.isLoading = true;
    this.userService.getUser(this.userEmail).subscribe({
      next: (data) => {
        console.log('User data:', data);
        this.user = data;
      },
      error: (err) => {
        console.error('Error fetching user data:', err);
        this.toastr.error('Failed to load user data.', 'Error');
      },
      complete: () => {
        this.isLoading = false;
      },
    });
  }
}

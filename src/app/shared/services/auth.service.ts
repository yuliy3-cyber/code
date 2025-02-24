import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  baseURL = 'http://localhost:5205/api';

  createUser(formData: any) {
    return this.http.post(this.baseURL + '/signup', formData);
  }

  signin(formData: any) {
    return this.http.post(this.baseURL + '/signin', formData);
  }

  checkEmail(email: { email: string }) {
    return this.http.post(this.baseURL + '/forgot-password/check-email', email);
  }

  resetPassword(formData: { email: string; newPassword: string }) {
    return this.http.post(this.baseURL + '/forgot-password/reset', formData);
  }

  getUserInfo() {
    return this.http.get(this.baseURL + '/user-info');
  }
}

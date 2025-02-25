import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseURL = 'http://localhost:5205/api';

  constructor(private http: HttpClient) {}

  getUser(email: string): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    return this.http.post<any>(
      `${this.baseURL}/user-info`,
      { email },
      { headers }
    );
  }

  changePassword(
    email: string,
    currentPassword: string,
    newPassword: string
  ): Observable<any> {
    const token = localStorage.getItem('token');
    let headers = new HttpHeaders();
    if (token) {
      headers = headers.set('Authorization', `Bearer ${token}`);
    }
    const body = { email, currentPassword, newPassword };
    return this.http.post<any>(`${this.baseURL}/change-password`, body, {
      headers,
    });
  }
}

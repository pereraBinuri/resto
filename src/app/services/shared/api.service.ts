import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private headers = new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'x-tenant-code': 'subway'
  });

  constructor(private http: HttpClient) {}

  // Function to make GET requests
  get<T>(url: string): Observable<T> {
    return this.http.get<T>(url, { headers: this.headers });
  }

  // Function to make POST requests
  post<T>(url: string, data: any): Observable<T> {
    return this.http.post<T>(url, data, { headers: this.headers });
  }

  // Function to make PUT requests
  put<T>(url: string, data: any): Observable<T> {
    return this.http.put<T>(url, data, { headers: this.headers });
  }

  // Function to make DELETE requests
  delete<T>(url: string): Observable<T> {
    return this.http.delete<T>(url, { headers: this.headers });
  }
}

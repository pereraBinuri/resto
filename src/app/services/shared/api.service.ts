import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.prod';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environments } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) {}

  // Getter for HTTP headers
  get headers(): HttpHeaders {
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Access-Control-Allow-Origin': '*',
      'x-tenant-code': 'subway'
    });
  }

  // Function to get the appropriate base URL based on the service type
  getBaseUrl(serviceType: 'user' | 'menu'): string {
    if (serviceType === 'user') {
      return environments.userServiceBaseUrl;
    } else if (serviceType === 'menu') {
      return environments.menuServiceBaseUrl;
    }
    throw new Error('Invalid service type. Use "user" or "menu".');
  }


  // Function to make GET requests
  get<T>(serviceType: 'user' | 'menu', endpoint: string): Observable<T> {
    const url = `${this.getBaseUrl(serviceType)}${endpoint}`;
    return this.http.get<T>(url, { headers: this.headers });
  }

  // Function to make POST requests
  post<T>(serviceType: 'user' | 'menu', endpoint: string, data: any): Observable<T> {
    const url = `${this.getBaseUrl(serviceType)}${endpoint}`;
    return this.http.post<T>(url, data, { headers: this.headers });
  }

  // Function to make PUT requests
  put<T>(serviceType: 'user' | 'menu', endpoint: string, data: any): Observable<T> {
    const url = `${this.getBaseUrl(serviceType)}${endpoint}`;
    return this.http.put<T>(url, data, { headers: this.headers });
  }

  // Function to make DELETE requests
  delete<T>(serviceType: 'user' | 'menu', endpoint: string): Observable<T> {
    const url = `${this.getBaseUrl(serviceType)}${endpoint}`;
    return this.http.delete<T>(url, { headers: this.headers });
  }
}

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

const API_TEST_URL = 'http://localhost:8080/api/test/';

const API_VIDEO_URL = 'http://localhost:8080/api/video/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getPublicContent(): Observable<any> {
    return this.http.get(API_TEST_URL + 'all', { responseType: 'text' });
  }

  getUserBoard(): Observable<any> {
    return this.http.get(API_TEST_URL + 'user', { responseType: 'text' });
  }
  
  getModeratorBoard(): Observable<any> {
    return this.http.get(API_TEST_URL + 'mod', { responseType: 'text' });
  }

  getAdminBoard(): Observable<any> {
    return this.http.get(API_TEST_URL + 'admin', { responseType: 'text' });
  }

  postSpeedPlayer(count: number): Observable<any> {
    if (typeof count !== 'number') {
      throw new Error('Count must be a number');
    }
    
    return this.http.post(API_VIDEO_URL + 'speed', { speed: count }, httpOptions);
  }
}

import { Injectable } from '@angular/core';
import { environment } from "../../environments/environment"
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Dedication } from '../models/dedication.interface';
import { CookieService } from 'ngx-cookie';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
  ) { }


  login(username: string, password: string) {
    return this.http.post(this.apiEndPoint(`auth/login`), { username, password }) as Observable<{ access_token: string }>;
  }
 
  checkLogin() {
    return this.http.get(this.apiEndPoint(`auth/login`), this.options) as Observable<{ access_token: string }>;
  }

  allDedication() {
    return this.http.get(this.apiEndPoint(`dedication`), this.options) as Observable<Dedication[]>;
  }
 
  createDedication(dedication: Dedication) {
    return this.http.post(this.apiEndPoint(`dedication`), dedication, this.options) as Observable<Dedication>;
  }
 
  deleteDedication(dedicationId: string) {
    return this.http.delete(this.apiEndPoint(`dedication/${dedicationId}`), this.options) as Observable<Dedication>;
  }

  updateDedication(dedication: Dedication) {
    return this.http.patch(this.apiEndPoint(`dedication/${dedication._id}`), dedication, this.options) as Observable<Dedication>;
  }

  get options() {
    let token = this.cookieService.get(environment.cookies.authToken.title);
    const headerDict = { "Authorization": "Bearer " + token }

    return { headers: headerDict };
  }

  private apiEndPoint(endpoint: string) {
    if (endpoint && endpoint.startsWith('/')) {
      endpoint = endpoint.substring(1);
    }
    return `${environment.apiServerURL}/api/${endpoint}`;
  }
}

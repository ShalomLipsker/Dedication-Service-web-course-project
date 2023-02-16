import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie';
import { BehaviorSubject, Observable } from 'rxjs';
import { map, share } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private _$isLogin: BehaviorSubject<boolean>;

  get $isLogin(): Observable<boolean> {
    return this._isLogin();
  }

  constructor(
    private apiService: ApiService,
    private cookieService: CookieService,
    private router: Router,
  ) {
    this._$isLogin = new BehaviorSubject<boolean>(false);
    this._isLogin();
  }

  login(username: string, password: string) {
    this.apiService.login(username, password).subscribe(res => {
      this.cookieService.put(environment.cookies.authToken.title, res.access_token)
      this._$isLogin.next(true);
      this.router.navigate(['dedication']);
    }, err => {
      this._$isLogin.next(false);
      if (err.status == 401) {
        alert('שם משתמש או סיסמה שגויים');
      } else {
        alert('בעיית שרת, נא לנסות שוב');
      }
      this.router.navigate(['login']);
    })
  }

  logout() {
    this.cookieService.remove(environment.cookies.authToken.title);
    location.reload();
  }

  private _isLogin() {
    const obs = this.apiService.checkLogin().pipe(share());
    obs.subscribe(res => {
      this._$isLogin.next(true);
    }, err => {
      this._$isLogin.next(false);
      this.router.navigate(['login']);
    })

    return obs.pipe(map(res => res ? true : false));
  }
}

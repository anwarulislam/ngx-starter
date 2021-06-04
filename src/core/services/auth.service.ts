import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models';
import { StorageService } from './storage.service';



@Injectable({ providedIn: 'root' })
export class AuthService {
  public currentUserSubject = new BehaviorSubject<User | any>(null);
  public currentUser = this.currentUserSubject.asObservable();

  private isAuthenticatedSubject = new ReplaySubject<boolean>(0);
  public isAuthenticatedCheck = this.isAuthenticatedSubject.asObservable();

  routes = {
    login: '/auth/login',
    register: '/auth/signup',
    get_user: '/auth/me',
    logout: '/auth/logout',
    recover: '/auth/recover',
  };

  static AUTH_TOKEN = 'access_token';
  static EXPIRES_AT = 'expires_at';

  expiredTimer: any;
  isBrowser: boolean;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient,
    private storage: StorageService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  get redirectUrl(): string {
    return this.route.snapshot.queryParams.returnUrl || '/';
  }

  // Verify JWT in localstorage with server & load user's info.
  // This runs once on application startup.

  getUserInfo() {
    if (this.isAuthenticated()) {
      return this.http
        .get(this.routes.get_user)
        .pipe(map((res: any) => res?.data));
    } else {
      return of(null);
    }
  }

  login(credentials: any): Observable<User> {
    return this.http.post(`/auth/login`, credentials).pipe(
      map((user: User | any) => {
        this.createSession(user);
        this.redirectToReturnUrl();
        return user;
      })
    );
  }

  redirectToReturnUrl() {
    if (this.redirectUrl.startsWith('http')) {
      return location.replace(this.redirectUrl);
    }
    this.router.navigateByUrl(this.redirectUrl);
  }

  register(credentials: any): Observable<User> {
    return this.http.post(this.routes.register, credentials).pipe(
      map((user: User | any) => {
        this.createSession(user);
        this.redirectToReturnUrl();
        return user;
      })
    );
  }

  recoverPassword(credentials: any): Observable<User> {
    return this.http
      .post(this.routes.recover, credentials)
      .pipe(map((res: any) => res?.data));
  }

  public logout(navigateUrl: string = '/auth/login') {
    this.http.post(this.routes.logout, {}).pipe(
      map((x) => {
        this.deleteSession();
        this.router.navigateByUrl(navigateUrl);
      })
    );
  }

  getCurrentUser(): User {
    return this.currentUserSubject.value;
  }

  public createSession(user: User | any) {
    // Save JWT sent from server in localstorage
    this.storage.setItem(AuthService.AUTH_TOKEN, user[AuthService.AUTH_TOKEN]);
    this.storage.setItem(AuthService.EXPIRES_AT, user[AuthService.EXPIRES_AT]);

    // Set current user data into observable
    this.currentUserSubject.next(user);
    // Set isAuthenticated to true
    this.isAuthenticatedSubject.next(true);

    this.startExpiresIn();
  }

  public deleteSession() {
    // Remove JWT from localstorage
    this.storage.removeItem(AuthService.AUTH_TOKEN);
    // Set current user to an empty object
    this.currentUserSubject.next(null);
    // Set auth status to false
    this.isAuthenticatedSubject.next(false);
    // this.sessionDeleted.next(new Date().toString());
  }

  public startExpiresIn() {
    const exp = this.storage.getItem(AuthService.EXPIRES_AT);

    const _currentTime = Date.now();
    const _expiredTime = new Date(exp.replace(/-/g, '/')).getTime();
    const _expiredInMillisecs = _expiredTime - _currentTime;

    if (this.expiredTimer) {
      clearTimeout(this.expiredTimer);
      this.expiredTimer = undefined;
    }
    try {
      this.expiredTimer = setTimeout(() => {
        try {
          this.deleteSession();
        } catch (err) {
          console.log('error on delete session: ', err);
        }
        console.log('session expired and auto logged out!');
        this.router.navigateByUrl(this.routes.login);
      }, _expiredInMillisecs);
    } catch (err) {
      console.log('expired time error: ', err);
    }
  }

  public isTokenExpired() {
    const token = this.storage.getItem(AuthService.AUTH_TOKEN);
    if (!token) {
      return true;
    }

    const exp = this.storage.getItem(AuthService.EXPIRES_AT);

    const currentTime = Date.now();
    const expirationTime = new Date(exp.replace(/-/g, '/')).getTime();

    if (currentTime >= expirationTime) {
      return true;
    }
    return false;
  }

  public isAuthenticated() {
    return !this.isTokenExpired();
  }
}

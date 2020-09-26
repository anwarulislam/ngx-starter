import { Injectable } from '@angular/core';
import {
    CanActivate, Router,
    ActivatedRouteSnapshot,
    RouterStateSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private auth: AuthService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
        const url: string = state.url;

        // return this.auth.isAuthenticated
        // .take(1)
        // .map((authState: FirebaseAuthState) => !!authState)
        // .do(authenticated => {
        //   if (!authenticated) this.router.navigate(['/login']);
        // });

        // console.log(this.auth.isAuthenticated())
        if (this.auth.isAuthenticated()) { return of(true); }

        // Navigate to the login page with extras
        this.router.navigate(['/auth'], { queryParams: { url } });
        return of(false);
    }
}

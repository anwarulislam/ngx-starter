import { Injectable, Injector } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { environment } from '@env/environment';
import { DataService } from '../services';

@Injectable({ providedIn: 'root' })

export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private data: DataService, private storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const HEADERS_CONFIG = {
            guest: 'TRUE'
        };

        const token = this.storage.getItem('access_token');

        if (token) {
            HEADERS_CONFIG['Authorization'] = `Bearer ${token}`;
        }

        const request = req.clone({ setHeaders: HEADERS_CONFIG });

        return next.handle(request);
    }
}

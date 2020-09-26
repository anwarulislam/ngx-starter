import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StorageService } from '../services/storage.service';
import { environment } from '@env/environment';

@Injectable({ providedIn: 'root' })

export class HttpTokenInterceptor implements HttpInterceptor {
    constructor(private storage: StorageService) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const HEADERS_CONFIG = {
            guest: 'TRUE',
            publicKey: environment.public_key
        };

        const token = this.storage.getItem('access_token');

        if (token) {
            HEADERS_CONFIG['Authorization'] = `Bearer ${token}`;
        }

        const request = req.clone({ setHeaders: HEADERS_CONFIG });

        return next.handle(request);
    }
}

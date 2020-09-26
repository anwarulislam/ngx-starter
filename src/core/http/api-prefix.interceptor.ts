import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';

import { environment } from '@env/environment';

/**
 * Prefixes all requests not starting with `http[s]` with `environment.serverUrl`.
 */
@Injectable({
    providedIn: 'root'
})
export class ApiPrefixInterceptor implements HttpInterceptor {

    constructor(
        // private transferState: TransferState,
    ) { }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // if (!/^(http|https):/i.test(request.url)) {
        //   request = request.clone({ url: environment.api_url + request.url });
        // }
        // console.log('working')
        // if (req.method !== 'GET') {
        //   return next.handle(req);
        // }

        // const storedResponse: string = this.transferState.get(makeStateKey(req.url), null);

        // if (storedResponse) {
        //   const response = new HttpResponse({ body: storedResponse, status: 200 });
        //   return of(response);
        // }

        return next.handle(req);
    }
}

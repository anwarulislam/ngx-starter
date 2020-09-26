import { Injectable, PLATFORM_ID, Inject } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, Subscriber, of } from 'rxjs';

import { HttpCacheService } from './http-cache.service';
import { TransferState, makeStateKey } from '@angular/platform-browser';

/**
 * Caches HTTP requests.
 * Use ExtendedHttpClient fluent API to configure caching for each request.
 */
@Injectable({
    providedIn: 'root'
})


export class CacheInterceptor implements HttpInterceptor {

    private forceUpdate = false;

    constructor(
        private httpCacheService: HttpCacheService,
        private transferState: TransferState,
        @Inject(PLATFORM_ID) private platformId: string
    ) { }

    /**
   * Configures interceptor options
   * @param options If update option is enabled, forces request to be made and updates cache entry.
   * @return The configured instance.
   */
    configure(options?: { update?: boolean } | null): CacheInterceptor {
        const instance = new CacheInterceptor(this.httpCacheService, this.transferState, this.platformId);
        if (options && options.update) {
            instance.forceUpdate = true;
        }
        return instance;
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if (request.method !== 'GET') {
            return next.handle(request);
        }

        return new Observable((subscriber: Subscriber<HttpEvent<any>>) => {
            const cachedData = this.forceUpdate ? null : this.httpCacheService.getCacheData(request.urlWithParams);
            if (cachedData !== null) {
                // Create new response to avoid side-effects
                subscriber.next(new HttpResponse(cachedData as object));
                subscriber.complete();
            } else {

                const storedResponse: string = this.transferState.get(makeStateKey(request.urlWithParams), null);

                if (storedResponse) {
                    const response = new HttpResponse({ body: storedResponse, status: 200 });
                    // console.log(request.url, response)
                    subscriber.next(response);
                    subscriber.complete();
                    // return of(response)
                }

                next.handle(request)
                    .subscribe(
                        event => {
                            if (event instanceof HttpResponse) {
                                this.httpCacheService.setCacheData(request.urlWithParams, event);
                            }
                            subscriber.next(event);
                        },
                        error => subscriber.error(error),
                        () => subscriber.complete()
                    );
            }
        });
    }

}

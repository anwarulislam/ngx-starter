import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie';

@Injectable({
    providedIn: 'root'
})
export class StorageService {

    // storage = localStorage

    constructor(private cookieService: CookieService) { }

    public setItem(key, data, forgot?: boolean) {
        data = data || null;
        // const storage = forgot ? sessionStorage : localStorage;
        // storage.setItem(key, data);

        this.cookieService.put(key, data, {
            expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1))
        });
    }

    public getItem(key, forgot?: boolean) {
        // const storage = forgot ? sessionStorage : localStorage;
        // let data = storage.getItem(key)
        // return data
        return this.cookieService.get(key);

    }

    public removeItem(key, forgot?: boolean) {
        // const storage = forgot ? sessionStorage : localStorage;
        // let data = storage.removeItem(key)

        this.cookieService.remove(key);
    }
}

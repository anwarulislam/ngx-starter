import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  // storage = localStorage

  constructor(private cookieService: CookieService) {}

  public setItem(key: string, data: any, forgot?: boolean) {
    data = data || null;
    // const storage = forgot ? sessionStorage : localStorage;
    // storage.setItem(key, data);

    this.cookieService.set(key, data, {
      expires: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    });
  }

  public getItem(key: string, forgot?: boolean) {
    // const storage = forgot ? sessionStorage : localStorage;
    // let data = storage.getItem(key)
    // return data
    return this.cookieService.get(key);
  }

  public removeItem(key: string, forgot?: boolean) {
    // const storage = forgot ? sessionStorage : localStorage;
    // let data = storage.removeItem(key)

    this.cookieService.delete(key);
  }
}

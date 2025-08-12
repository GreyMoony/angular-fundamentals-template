import { Injectable, Inject } from '@angular/core';
import { WINDOW } from './window.token';

const TOKEN = 'SESSION_TOKEN'; // Use this constant for the session storage entry key
// Add your code here

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  constructor(@Inject(WINDOW) private readonly window: Window) {}

  setToken(token: string){
    this.window.sessionStorage.setItem(TOKEN, token);
  }

  getToken(){
    return this.window.sessionStorage.getItem(TOKEN);
  }

  deleteToken(){
    this.window.sessionStorage.removeItem(TOKEN);
  }
}

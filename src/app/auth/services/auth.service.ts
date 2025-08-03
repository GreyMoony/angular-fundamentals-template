import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { SessionStorageService } from './session-storage.service';


const API_BASE = 'http://localhost:4000';
const TOKEN_PREFIX = 'Bearer ';

export interface LoginDto {
    email: string;
    password: string;
}

export interface RegisterDto {
    name: string;
    email: string;
    password: string;
}

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private readonly isAuthorized$$ = new BehaviorSubject<boolean>(this.hasToken());
    public isAuthorized$ = this.isAuthorized$$.asObservable();

    constructor(
        private readonly http: HttpClient,
        private readonly sessionStorageService: SessionStorageService
    ) { }

    login(user: LoginDto): Observable<any> {
        return this.http.post(`${API_BASE}/login`, user).pipe(
            tap((response: any) => {
                if (response?.successful && response?.result) {
                    this.sessionStorageService.setToken(response.result);
                    this.isAuthorized = true;
                }
            })
        );
    }

    logout(): Observable<any> {
        const token = this.sessionStorageService.getToken();
        const headers = new HttpHeaders({
            Authorization: token ? `${token}` : '',
        });

        return this.http.delete(`${API_BASE}/logout`, { headers }).pipe(
            tap(() => {
                this.sessionStorageService.deleteToken();
                this.isAuthorized = false;
            })
        );
    }

    register(user: RegisterDto): Observable<any> {
        return this.http.post(`${API_BASE}/register`, user);
    }

    get isAuthorized(): boolean {
        return this.isAuthorized$$.value;
    }

    set isAuthorized(value: boolean) {
        this.isAuthorized$$.next(value);
    }

    getLoginUrl(): string {
        return '/login';
    }

    private hasToken(): boolean {
        return !!this.sessionStorageService.getToken();
    }
}

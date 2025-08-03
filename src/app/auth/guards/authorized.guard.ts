import { Injectable } from '@angular/core';
import {
    CanLoad,
    Route,
    UrlSegment,
    Router,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthorizedGuard implements CanLoad {
    constructor(private readonly authService: AuthService, private readonly router: Router) { }
    canLoad(
        route: Route,
        segments: UrlSegment[]
    ): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        return this.authService.isAuthorized
            ? true
            : this.router.parseUrl('/login');
    }
}

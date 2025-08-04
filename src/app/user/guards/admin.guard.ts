import { Injectable } from '@angular/core';
import { CanActivate, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { UserStoreService } from '../services/user-store.service';

@Injectable({
    providedIn: 'root'
})
export class AdminGuard implements CanActivate {
    constructor(
        private readonly userStoreService: UserStoreService,
        private readonly router: Router
    ) { }

    canActivate(): Observable<boolean | UrlTree> {
        return this.userStoreService.isAdmin$.pipe(
            map(isAdmin => {
                return isAdmin ? true : this.router.createUrlTree(['/courses']);
            })
        );
    }
}

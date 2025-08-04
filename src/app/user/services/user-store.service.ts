import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from './user.service';

@Injectable({
    providedIn: 'root'
})
export class UserStoreService {
    private readonly name$$ = new BehaviorSubject<string | null>(null);
    private readonly isAdmin$$ = new BehaviorSubject<boolean>(false);

    public name$ = this.name$$.asObservable();
    public isAdmin$ = this.isAdmin$$.asObservable();

    constructor(private readonly userService: UserService) { }

    getUser() {
        this.userService.getUser().subscribe({
            next: (response) => {
                const user = response.result;
                this.name$$.next(user.name ?? user.email);
                this.isAdmin$$.next(user.role.toLowerCase() === 'admin');
            },
            error: () => {
                this.name$$.next(null);
                this.isAdmin$$.next(false);
            },
        });
    }

    get isAdmin() {
        return this.isAdmin$$.value;
    }

    set isAdmin(value: boolean) {
        this.isAdmin$$.next(value);
    }
}

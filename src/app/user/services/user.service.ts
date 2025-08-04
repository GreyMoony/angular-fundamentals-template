import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface UserResponse {
  successful: boolean;
  result: {
    name: string | null;
    email: string;
    password: string;
    role: string;
    id: string;
  };
}

@Injectable({
    providedIn: 'root'
})
export class UserService {
    private readonly baseUrl = 'http://localhost:4000/users/me';

    constructor(private readonly http: HttpClient) { }

    getUser(): Observable<UserResponse> {
        return this.http.get<UserResponse>(this.baseUrl);
    }
}

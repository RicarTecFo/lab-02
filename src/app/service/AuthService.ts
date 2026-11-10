import { Service, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
// import { Observable } from 'rxjs';
import { LoginData } from '../interface/LoginData';
import { AuthResponse } from '../interface/AuthResponse';
import { RegisterData } from '../interface/RegisterData';

@Service()
export class AuthService {

    private readonly http = inject(HttpClient);
    private readonly url = "http://localhost:8080/api/v1/auth";

    login(request: LoginData) {
        return this.http.post<AuthResponse>(
            `${this.url}/login`,
            request
        );
    }

    register(request: RegisterData) {
        return this.http.post<AuthResponse>(
            `${this.url}/registro`,
            request
        );
    }

    // función auxiliar

    getCurrentUser() {
        const user = localStorage.getItem('user');
        return user ? JSON.parse(user): null;
    }

    // 

    isLoggedIn(): boolean {
        return !!localStorage.getItem('token');
    }

    isAdmin(): boolean {
        const user = this.getCurrentUser();
        return user?.role === 'SUPER-ADMIN-ROLE';
    }
}
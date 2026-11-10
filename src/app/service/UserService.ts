import { inject, Service } from "@angular/core";
import { Observable } from 'rxjs';
import { UserData } from '../interface/UserData';
import { HttpClient } from "@angular/common/http";

@Service()
export class UserService {

    private apiUrl = 'http://localhost:8080/api/users';

    private readonly http = inject(HttpClient);

    getAllUsers(): Observable<UserData[]> {
    return this.http.get<UserData[]>(this.apiUrl);
  }

}
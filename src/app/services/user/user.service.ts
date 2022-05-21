import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User } from './types/user.type';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userFirebaseUid$ = new BehaviorSubject<string | undefined>(''); 

  constructor(private http: HttpClient) {
  }

  getUser(id: String): Observable<User> {
    const url = `${environment.apiUrl}/api/users/${id}`;
    return this.http.get<User>(url);
  }

  createUser(data: object, uid: string | undefined): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}`;
    return this.http.post(url, { ...data });
  }

}

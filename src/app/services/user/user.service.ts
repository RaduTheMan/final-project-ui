import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
  }

  getUser(id: String): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${id}`;
    return this.http.get(url);
  }

}

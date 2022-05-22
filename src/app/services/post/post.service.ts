import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  constructor(private http: HttpClient) {}

  //   getUser(id: String): Observable<User> {
  //     const url = `${environment.apiUrl}/api/users/${id}`;
  //     return this.http.get<User>(url);
  //   }

  createPost(data: object, uid: string | undefined): Observable<unknown> {
    const url = `${environment.apiUrl}/api/users/${uid}/posts`;
    return this.http.post(url, { ...data });
  }

  getPostsByUserId(uid: string, lastDate?: number): Observable<Post[]> {
    const url = `${environment.apiUrl}/api/users/${uid}/posts`;
    let params = undefined;
    if (lastDate) {
      params = new HttpParams().set('lastDate', lastDate);
    }
    return this.http.get<Post[]>(url, { params });
  }
}

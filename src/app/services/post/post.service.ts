import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Post } from './types/post.type';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  arePostsLoaded$ = new BehaviorSubject<boolean>(true);

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

  getAllPosts(): Observable<Post[]> {
    const url = `${environment.apiUrl}/api/posts`;
    return this.http.get<Post[]>(url);
  }

  translatePost(
    originalTitle: string, 
    originalContent: string, 
    target: string
  ): Observable<{translatedTitle: string; translatedContent: string;}> {
    const url = `${environment.apiUrl}/api/post-translate`;
    const params = new HttpParams()
      .set('originalTitle', originalTitle)
      .set('originalText', originalContent)
      .set('target', target);
    return this.http.get<[string, string]>(url, { params }).pipe(map(([translatedTitle, translatedContent]) => {
      return {
        translatedTitle, 
        translatedContent
      };
    }));
  }

  getAudioFromPost(title: string, content: string): Observable<unknown> {
    const url = `${environment.apiUrl}/api/post-audio`;
    const params = new HttpParams()
      .set('title', title)
      .set('content', content);
    return this.http.get(url, { params });
  }
}

import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { BehaviorSubject, from, Observable } from 'rxjs';
import { UserToken } from './user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$ = new BehaviorSubject<UserToken | null>(null);

  isLoggedIn = false;
  userId: string | undefined = '';

  userToken: UserToken | null = null;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private router: Router
  ) {}

    googleSignIn(): Observable<firebase.auth.UserCredential> {
     const provider = new firebase.auth.GoogleAuthProvider();
     return from(this.afAuth.signInWithPopup(provider));
   }

    signOut() {
     this.afAuth.signOut();
     this.router.navigate(['']);
   }


}

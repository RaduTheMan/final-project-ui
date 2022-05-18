import { Injectable } from '@angular/core';
import firebase from 'firebase/compat/app';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Observable, of, switchMap } from 'rxjs';
import { User } from './types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<User | null | undefined>;

  constructor(
    private readonly afAuth: AngularFireAuth,
    private readonly afs: AngularFirestore,
    private router: Router
  ) {
    this.user$ = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges();
        } else {
          return of(null);
        }
      })
    );
   }

    googleSignIn() {
     const provider = new firebase.auth.GoogleAuthProvider();
     this.afAuth.signInWithPopup(provider);
   }

    signOut() {
     this.afAuth.signOut();
     this.router.navigate(['']);
   }


}

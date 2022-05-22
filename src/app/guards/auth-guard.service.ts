/* eslint-disable max-lines-per-function */
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../services';
import { UserService } from '../services/user/user.service';
import firebase from 'firebase/compat/app';
import { UserToken } from '../services/user-token';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly authService: AuthService, private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const condition = this.router.getCurrentNavigation()?.extras?.state?.['comesFromSignUp'];
    let uid: string | undefined = '';
    let userToken: UserToken | null = null;
    if (condition) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), tap(res => {
        if (typeof res !== 'boolean') {
          userToken = this.createToken(res.user?.uid, res.credential as firebase.auth.OAuthCredential);
          this.authService.user$.next(userToken);
        }
      }), switchMap(response => {
        if (typeof response === 'boolean') {
          return of(response);
        }
        uid = response.user?.uid;
        if (response.additionalUserInfo?.isNewUser) {
          this.userService.userFirebaseUid$.next(uid);
          return of(true);
        }
        if (response.user?.uid === undefined) {
          return of(false);      //de tratat
        }
        return this.userService.getUser(response.user.uid);
      }), catchError(_ => {
        this.userService.userFirebaseUid$.next(uid);
        return of(true);
      }), switchMap(response => {
        if (typeof response !== 'boolean') {
          this.authService.isLoggedIn = true;
          this.authService.userId = uid;
          this.authService.userToken = userToken;
          localStorage.setItem('userData', JSON.stringify(userToken));
          return of(false);
        }
       return of(response);
      }));
    }
    return false;
  }

  private createToken(id: string | undefined, response: firebase.auth.OAuthCredential) {
    console.log(response);
    const token = response.idToken;
    const milis = 3600 * 1000;
    const expirationDate = new Date(new Date().getTime() + milis);
    return new UserToken(id, token, expirationDate);
  }
}

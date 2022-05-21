import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services';
import { UserService } from '../services/user/user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly authService: AuthService, private router: Router, private userService: UserService) { }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    const condition = this.router.getCurrentNavigation()?.extras?.state?.['comesFromSignUp'];
    let uid: string | undefined = '';
    if (condition) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), switchMap(response => {
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
          return of(false);
        }
       return of(response);
      }));
    }
    return false;
  }
}

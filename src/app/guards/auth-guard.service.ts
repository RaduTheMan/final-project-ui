import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot } from '@angular/router';
import { catchError, map, Observable, of, switchMap } from 'rxjs';
import { AuthService } from '../services';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | boolean {
    if (route.params['comesFromSignUp']) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), map(response => {
        if (typeof response === 'boolean'){
          return response;
        }
        if (response.additionalUserInfo?.isNewUser) {
          return true;
        }
        return false;
      }));
    }
    return false;
  }
}

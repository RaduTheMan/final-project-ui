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
    this.userService.getUser('Da2QpGMIJTMpW4UrfqLrhIVn2Cd2').subscribe(user => {
      console.log(user);
    });
    if (condition) {
      return this.authService.googleSignIn().pipe(catchError(_ => of(false)), map(response => {
        if (typeof response === 'boolean') {
          return response;
        }
        if (response.additionalUserInfo?.isNewUser) {
          return true;
        }
        console.log(response);
        return false;
      }));
    }
    return false;
  }
}

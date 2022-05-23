import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services';

@Injectable({
    providedIn: 'root'
  })
export class ProfileGuardService implements CanActivate {

    constructor(private readonly authService: AuthService, private readonly router: Router) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        // if (!this.authService.isLoggedIn){
        //     this.router.navigate(['']);
        // }
        return true;
    }
}
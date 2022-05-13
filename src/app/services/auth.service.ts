import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

private isUserNotOnAuthPages$ = new BehaviorSubject<boolean>(true);
isUserNotOnAuthPagesObs = this.isUserNotOnAuthPages$.asObservable();

constructor() { }

emitAuthStatus(flag: boolean): void {
  this.isUserNotOnAuthPages$.next(flag);
}

}

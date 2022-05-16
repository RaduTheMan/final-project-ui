import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

isUserNotOnAuthPagesObs:Observable<boolean>;
private isUserNotOnAuthPages$ = new BehaviorSubject<boolean>(true);


constructor() {
  this.isUserNotOnAuthPagesObs = this.isUserNotOnAuthPages$.asObservable();
}

emitAuthStatus(flag: boolean): void {
  this.isUserNotOnAuthPages$.next(flag);
}

}

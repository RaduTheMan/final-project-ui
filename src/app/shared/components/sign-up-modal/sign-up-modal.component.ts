import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, take } from 'rxjs';
import { AuthService } from 'src/app/services';
import { UserToken } from 'src/app/services/user-token';
import { UserService } from 'src/app/services/user/user.service';


const minNameLength: number = 6;

@UntilDestroy()
@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements AfterViewInit {
  @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  formGroup: FormGroup;
 
  constructor(private readonly userService: UserService, private readonly router: Router, private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(minNameLength)]),
      country: new FormControl(null, Validators.required),
      city: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
    });
  }

  ngAfterViewInit(): void {
    this.myModalTrigger.nativeElement.click();
  }

  onSave(): void {
    const data = this.formGroup.getRawValue();
    let userId: string | undefined = '';
    this.userService.userFirebaseUid$.pipe(take(1), switchMap(uid => {
      userId = uid;
      return this.userService.createUser({ ...data }, uid);
    }), untilDestroyed(this)).subscribe(_ => {
      this.router.navigate(['profile', userId]);
      this.authService.isLoggedIn = true;
      this.authService.userId = userId;
      this.authService.user$.subscribe(userToken => {
        this.authService.userToken = userToken;
        localStorage.setItem('userData', JSON.stringify(userToken));
      });
    });
  }
}

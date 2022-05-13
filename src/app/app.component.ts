import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './services';

const maxLengthAuthorName = 20;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Writify';
  searchFormGroup: FormGroup;
  isNavbarActive$: Observable<boolean>;

  constructor(private readonly router: Router, private readonly authService: AuthService) {
    this.isNavbarActive$ = this.authService.isUserNotOnAuthPagesObs;
    this.searchFormGroup = new FormGroup({
      authorName: new FormControl(null, Validators.maxLength(maxLengthAuthorName))
    });
  }

  inputValidator(event: any): void {
    const errors = this.searchFormGroup.get('authorName')?.errors;
    if(errors !== null && errors !== undefined) {
      if(Object.keys(errors as ValidationErrors).includes('maxlength')){
        const value = event.target.value as String;
        event.target.value = value.slice(0, value.length - 1);
        this.searchFormGroup.get('authorName')?.setValue(event.target.value);
      }
    }
  }

  onEnter(): void {
    if(this.searchFormGroup.get('authorName')?.valid){
      console.log('valid');
    }
  }

  loadLoginPage(): void {
    this.router.navigate(['/login']);
  }

  loadSignUpPage(): void {
    this.router.navigate(['sign-up']);
  }
}

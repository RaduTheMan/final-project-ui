import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Router } from '@angular/router';

const maxLengthAuthorName = 20;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Writify';
  searchFormGroup: FormGroup;

  constructor(private readonly router: Router) {
    this.searchFormGroup = new FormGroup({
      authorName: new FormControl(null, Validators.maxLength(maxLengthAuthorName))
    });
  }

  inputValidator(event: any): void {
    const errors = this.searchFormGroup.get('authorName')?.errors;
    if (errors !== null && errors !== undefined) {
      if (Object.keys(errors as ValidationErrors).includes('maxlength')){
        const value = event.target.value as String;
        event.target.value = value.slice(0, value.length - 1);
        this.searchFormGroup.get('authorName')?.setValue(event.target.value);
      }
    }
  }

  onEnter(): void {
    if (this.searchFormGroup.get('authorName')?.valid){
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

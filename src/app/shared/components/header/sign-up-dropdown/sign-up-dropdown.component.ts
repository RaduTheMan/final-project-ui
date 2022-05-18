import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-dropdown.component.html',
  styleUrls: ['./sign-up-dropdown.component.css']
})
export class SignUpDropdownComponent {

  formGroup: FormGroup;

  constructor(private readonly authService: AuthService) {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required)
    });
  }

  signUp(): void {
    this.authService.googleSignIn();
  }

}

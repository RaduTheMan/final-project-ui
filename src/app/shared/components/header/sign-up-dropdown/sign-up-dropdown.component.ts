import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-dropdown.component.html',
  styleUrls: ['./sign-up-dropdown.component.css']
})
export class SignUpDropdownComponent {

  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      firstName: new FormControl(null, Validators.required),
      lastName: new FormControl(null, Validators.required)
    });
  }

  test(): void {
    console.log(this.formGroup.getRawValue());
  }

}

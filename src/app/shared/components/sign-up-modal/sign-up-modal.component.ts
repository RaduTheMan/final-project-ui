import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


const minNameLength: number = 6;
@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent {
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl(null, [Validators.required, Validators.minLength(minNameLength)]),
      address: new FormControl(null, Validators.required),
      birthdate: new FormControl(null, Validators.required),
      contact: new FormControl(null, [Validators.required, Validators.email]),
    });
  }


}
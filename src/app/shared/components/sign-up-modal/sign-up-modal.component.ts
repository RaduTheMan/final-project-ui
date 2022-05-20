import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


const minNameLength: number = 6;
@Component({
  selector: 'app-sign-up-modal',
  templateUrl: './sign-up-modal.component.html',
  styleUrls: ['./sign-up-modal.component.css']
})
export class SignUpModalComponent implements AfterViewInit {
  @ViewChild('myModalTrigger') myModalTrigger!: ElementRef;
  formGroup: FormGroup;
 
  constructor() {
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
    console.log(this.formGroup.getRawValue());
  }
}

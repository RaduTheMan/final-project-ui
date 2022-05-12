import { Component } from '@angular/core';
import { FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
const maxLengthAuthorName = 20;
const maxLengthExcedeedMessage = `Max length of ${maxLengthAuthorName} characters excedeed!`;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Writify';
  searchFormGroup: FormGroup;

  constructor(private readonly snackBar: MatSnackBar) {
    this.searchFormGroup = new FormGroup({
      authorName: new FormControl(null, Validators.maxLength(maxLengthAuthorName))
    });
  }

  inputValidator(event: any) {
    const errors = this.searchFormGroup.get('authorName')?.errors;
    if(errors !== null && errors !== undefined) {
      if(Object.keys(errors as ValidationErrors).includes('maxlength')){
        const value = event.target.value as String;
        event.target.value = value.slice(0, value.length - 1);
        this.searchFormGroup.get('authorName')?.setValue(event.target.value);
      }
    }
  }

  onEnter() {
    if(this.searchFormGroup.get('authorName')?.valid){
      console.log('valid');
    }
  }
}

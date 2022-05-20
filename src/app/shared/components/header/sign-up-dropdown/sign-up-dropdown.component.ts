import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { from, take } from 'rxjs';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up-dropdown.component.html',
  styleUrls: ['./sign-up-dropdown.component.css']
})
export class SignUpDropdownComponent {

  constructor(private readonly router: Router, private readonly authService: AuthService,) {}

  signUp(): void {
    const navigator = from(this.router.navigate(['complete-profile'], { state : { comesFromSignUp : true } }));
    navigator.pipe(take(1)).subscribe(response => {
      if (!response){
        this.router.navigate(['']);
      }
    });
    /*
    this.authService.googleSignIn().subscribe(result => {
      console.log(result);
      //we should somehow redirect the user to another page where he
      //can enter info for his profile, if the operation type is sign up

      //if the operation type is sign in, we should redirect the user to the home page(or to his profile)
    });
    */
  }

}

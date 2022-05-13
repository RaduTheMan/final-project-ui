import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnDestroy {

  constructor(private readonly authService: AuthService) {
    this.authService.emitAuthStatus(false);
  }

  ngOnDestroy(): void {
    this.authService.emitAuthStatus(true);
  }

}

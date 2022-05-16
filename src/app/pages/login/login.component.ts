import { Component, OnDestroy } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnDestroy {

  constructor(private readonly authService: AuthService) {
    this.authService.emitAuthStatus(false);
  }

  ngOnDestroy(): void {
    this.authService.emitAuthStatus(true);
  }
}

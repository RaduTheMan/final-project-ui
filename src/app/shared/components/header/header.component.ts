import { Component } from '@angular/core';
import { AuthService } from 'src/app/services';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  isAuthenticated = false;
  constructor(public readonly authService: AuthService) { }

  onLogout() {
    this.isAuthenticated = !this.isAuthenticated;
  }

}

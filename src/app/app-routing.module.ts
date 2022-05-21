import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './guards/auth-guard.service';
import { ProfileGuardService } from './guards/profile-guard.service';
import { HomeComponent, LoginComponent } from './pages';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { SignUpModalComponent } from './shared/components/sign-up-modal/sign-up-modal.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'profile/:userId',
    component: UserProfileComponent,
    canActivate: [ProfileGuardService]
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'complete-profile',
    component: SignUpModalComponent,
    canActivate: [AuthGuardService]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

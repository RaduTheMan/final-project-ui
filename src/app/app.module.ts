import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent, LoginComponent } from './pages';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInfoComponent } from './pages/user-profile/user-info/user-info.component';
import { UserPostsComponent } from './pages/user-profile/user-posts/user-posts.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserPostsComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

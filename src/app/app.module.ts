import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages';
import { SharedModule } from './shared/shared.module';
import { UserProfileComponent } from './pages/user-profile/user-profile.component';
import { UserInfoComponent } from './pages/user-profile/user-info/user-info.component';
import { UserPostsComponent } from './pages/user-profile/user-posts/user-posts.component';
import { SignUpModalComponent } from './shared/components/sign-up-modal/sign-up-modal.component';
import { environment } from 'src/environments/environment';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { HttpClientModule } from '@angular/common/http';
import { AddPostComponent } from './pages/user-profile/add-post/add-post.component';
import { PostComponent } from './services/post/post/post.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    UserProfileComponent,
    UserInfoComponent,
    UserPostsComponent,
    PostComponent,
    SignUpModalComponent,
    AddPostComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule, 
    AppRoutingModule, 
    BrowserAnimationsModule,
    FormsModule, 
    ReactiveFormsModule, 
    MaterialModule, 
    SharedModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

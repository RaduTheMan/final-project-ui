import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { AppRoutingModule } from '../app-routing.module';
import { SignUpDropdownComponent } from './components/header';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent
  ],
  declarations: [HeaderComponent, SignUpDropdownComponent]
})
export class SharedModule { }

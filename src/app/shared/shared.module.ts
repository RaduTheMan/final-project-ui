import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components';
import { AppRoutingModule } from '../app-routing.module';
import { SignUpDropdownComponent } from './components/header';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  imports: [
    CommonModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  exports: [
    HeaderComponent,
    SpinnerComponent
  ],
  declarations: [HeaderComponent, SignUpDropdownComponent, SpinnerComponent]
})
export class SharedModule { }

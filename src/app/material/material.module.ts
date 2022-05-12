import { NgModule } from '@angular/core';

import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const components = [
  MatButtonModule, 
  MatToolbarModule, 
  MatFormFieldModule,
  MatInputModule, 
  MatSelectModule,
  MatSnackBarModule
];

@NgModule({
  imports: [...components],
  exports: [...components]
})
export class MaterialModule { }

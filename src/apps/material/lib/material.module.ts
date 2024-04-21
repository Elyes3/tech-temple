import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule
  ]
})
export class MaterialModule {}
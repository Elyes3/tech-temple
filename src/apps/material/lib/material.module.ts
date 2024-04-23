import { NgModule } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatStepperModule} from '@angular/material/stepper';
import {MatGridListModule} from '@angular/material/grid-list';
@NgModule({
  imports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatGridListModule
  ],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatStepperModule,
    MatGridListModule
  ]
})
export class MaterialModule {}
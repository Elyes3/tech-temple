import { Component } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ResetInfo } from '../../shared/resetinfo';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
    providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: true},
    },
  ],
})
export class ForgotPasswordComponent {
  constructor(private _formBuilder: FormBuilder) {}

  resetInfo: ResetInfo = {
    email: '',
    password: '',
    confirmPassword: ''
  }
}

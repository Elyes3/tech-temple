import { AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule, NgModel } from '@angular/forms';
import {STEPPER_GLOBAL_OPTIONS} from '@angular/cdk/stepper';
import { ResetInfo } from '../../shared/Resetinfo';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatStepper } from '@angular/material/stepper';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
    providers: [
    {
      provide: STEPPER_GLOBAL_OPTIONS,
      useValue: {showError: false},
    },
  ],
})
export class ForgotPasswordComponent implements AfterViewInit{
  @ViewChild('stepper') stepper!: MatStepper;
  sendReset(email : string) {
    this.authService.sendReset(email).subscribe(() => {
          this.isSubmitted = true;
    });
  }
  resetPassword() {
    let id = this.route.snapshot.queryParams["id"]
    let token = this.route.snapshot.queryParams["token"]
    if (this.resetInfo.password == this.resetInfo.confirmPassword) {
      this.authService.resetPassword(this.resetInfo.password, id, token).subscribe(() => {
        this.router.navigateByUrl("/")
      });
    }

}
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute) { }
  isSubmitted = false;
  resetInfo: ResetInfo = {
    email: '',
    password: '',
    confirmPassword: ''
  }
  ngAfterViewInit(): void {
    if (this.route.snapshot.queryParams["id"] && this.route.snapshot.queryParams["token"]) {
      this.stepper.next();
      this.changeDetectorRef.detectChanges();
      }
  }
}

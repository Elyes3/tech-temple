import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from "@emailjs/browser"
import { UserService } from '../../services/userService';
import { ViewChild } from '@angular/core';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';

@Component({
  selector: 'app-user-reclamation',
  templateUrl: './user-reclamation.component.html',
  styleUrls: ['./user-reclamation.component.scss']
})
export class UserReclamationComponent implements OnInit {

  firstName: string= ''
  lastName: string=''

  initialName: string = ''
  initialEmail: string = ''
  issue_type_name: string = ''

  issueType: string= ''

  form: FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    issue_type:['', Validators.required],
    description:['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private usersFacade: UsersFacade) {}

  @ViewChild('complaintModalSuccess') complaintModalSuccess!: any;
  @ViewChild('complaintModalFailed') complaintModalFailed!: any;

  ngOnInit(): void {
    this.usersFacade.authenticatedUser$.subscribe(
      (data) => {
        this.firstName= data.authenticatedUser?.firstName.toUpperCase()??'';
        this.lastName= data.authenticatedUser?.lastName.toUpperCase()??'';
        this.initialName = this.firstName + " " + this.lastName;
        this.initialEmail = data.authenticatedUser?.email??''
      },
      (error) => {
        console.error(error);
      }
    );
  }

  openSuccessModal( ) {
    this.complaintModalSuccess.nativeElement.classList.add('show');
    this.complaintModalSuccess.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    setTimeout(() => {
      this.closeSuccessModal();
    }, 2000);
  }

  openFailedModal( ) {
    this.complaintModalFailed.nativeElement.classList.add('show');
    this.complaintModalFailed.nativeElement.style.display = 'block';
    document.body.classList.add('modal-open');
    setTimeout(() => {
      this.closeFailedModal();
    }, 2000);
  }

  closeSuccessModal() {
    this.complaintModalSuccess.nativeElement.classList.remove('show');
    this.complaintModalSuccess.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  closeFailedModal() {
    this.complaintModalFailed.nativeElement.classList.remove('show');
    this.complaintModalFailed.nativeElement.style.display = 'none';
    document.body.classList.remove('modal-open');
  }

  async send() {
    emailjs.init('1PiN07DXX6J7r7Njj');
    if (this.form.get('name')?.value == '' || this.form.get('email')?.value == '' || this.form.get('issue_type')?.value == '' || this.form.get('description')?.value == '' )
    {
      this.openFailedModal();    
    }
    else {
      switch (this.form.get('issue_type')?.value) {
        case '1' : this.issue_type_name = "Product damaged while in delivery"; break;
        case '2' : this.issue_type_name = "Wrong product received"; break;
        case '2' : this.issue_type_name = "Payment issues"; break;
      }
      let response = await emailjs.send("service_qi8v6zg","template_d0w8z7r",{
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        issue_type: this.issue_type_name,
        description: this.form.get('description')?.value,
        });
        this.openSuccessModal();
        this.form.patchValue({
          issue_type: '',
          description: ''
        });
    }   
  }
}

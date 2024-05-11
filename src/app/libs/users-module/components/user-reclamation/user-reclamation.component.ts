import { Component, OnInit, inject} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import emailjs from "@emailjs/browser"
import { UserService } from '../../services/userService';
import { ToastrService } from 'ngx-toastr';
import { ViewChild } from '@angular/core';

@Component({
  selector: 'app-user-reclamation',
  templateUrl: './user-reclamation.component.html',
  styleUrls: ['./user-reclamation.component.scss']
})
export class UserReclamationComponent implements OnInit {

  initialName: string = ''
  initialEmail: string = ''

  form: FormGroup = this.fb.group({
    name:['', Validators.required],
    email:['', [Validators.required, Validators.email]],
    issue_type:['', Validators.required],
    description:['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService) {}

  @ViewChild('complaintModalSuccess') complaintModalSuccess!: any;
  @ViewChild('complaintModalFailed') complaintModalFailed!: any;

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      (data) => {
        this.initialName = data.firstName.toUpperCase()+' '+data.lastName.toUpperCase();
        this.initialEmail = data.email;
        console.log(data);
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
      let response = await emailjs.send("service_qi8v6zg","template_d0w8z7r",{
        name: this.form.get('name')?.value,
        email: this.form.get('email')?.value,
        issue_type: this.form.get('issue_type')?.value,
        description: this.form.get('description')?.value,
        });
        this.openSuccessModal();
        this.form.reset;
    }   
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/userService';
import { UsersFacade } from 'src/app/libs/state/users/users.facade';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  user: any;

  defaultImgUrl: string = "https://st3.depositphotos.com/15648834/17930/v/450/depositphotos_179308454-stock-illustration-unknown-person-silhouette-glasses-profile.jpg";

  initialFirstName: string = ''
  initialLastName: string = ''
  initialEmail: string = '';
  role: string = ''
  initialImage: string = ''

  imageUrl: string | ArrayBuffer | null = this.defaultImgUrl;

  form: FormGroup = this.fb.group({
    firstName:['', Validators.required],
    lastName:['', [Validators.required, Validators.email]],
    email:['', Validators.required],
    role:['', Validators.required],
  });

  constructor(private fb: FormBuilder, private userService: UserService, private usersFacade: UsersFacade) {}

  ngOnInit(): void {
    this.usersFacade.authenticatedUser$.subscribe(
      (data) => {
        this.initialFirstName = data.authenticatedUser?.firstName.toUpperCase()??'';
        this.initialLastName = data.authenticatedUser?.lastName.toUpperCase()??''
        this.initialEmail = data.authenticatedUser?.email.toUpperCase()??''
        this.role = data.authenticatedUser?.role??'';
        this.initialImage = data.authenticatedUser?.img?? this.defaultImgUrl; 
      },
      (error) => {
        console.error(error);
      }
    );
  }

  onFileSelected(event: any) {
    const file: File = event.target.files[0];
    const reader = new FileReader();

    reader.onload = () => {
      this.imageUrl = reader.result;
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  resetImage(): void {
    if (this.initialImage == null)
      this.imageUrl = this.defaultImgUrl
    else
      this.imageUrl = this.initialImage;
  }
}

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/userService';


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

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

  constructor(private fb: FormBuilder, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.getUserById(1).subscribe(
      (data) => {
        this.initialFirstName = data.firstName.toUpperCase();
        this.initialLastName = data.lastName.toUpperCase()
        this.initialEmail = data.email;
        this.role = data.role
        this.initialImage = data.img
        if (data.img != null) {
          this.imageUrl = data.img;
        }
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

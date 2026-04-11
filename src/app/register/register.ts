import { FormsModule } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgFor } from '@angular/common';
import { DefaultService } from '../../openapi';
import { User } from '../../openapi/model/user';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [NgFor, FormsModule],
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
  UserID: string = '';
  name: string = '';
  Surname: string = '';
  Cellphone: string = '';
  email: string = '';
  userTypes = ['Member', 'Admin', 'Owner'];
  user: User = {
    id: '',
    name: '',
    surname: '',
    email: '',
    password: '',
    cellphone: '',
    user_type: ''
  };

  constructor(private service: DefaultService) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this .user.id = this.UserID; 
    this.user.name = this.name;
    this.user.surname = this.Surname;
    this.user.cellphone = this.Cellphone;
    this.user.email = this.email;
    this.user.user_type = this.userTypes.toString();

    console.log(this.user)
    this.service.regUserRegisterPost(this.user).subscribe({
      next: response => {
        if (response === 'Registered') {
          console.log(typeof response);
          alert('User registered successfully');
        }else {
          //To do something for user already registered
        }
        
      },
      error: error => {
        console.log(error);
        alert('Error registering user');
      }
    });
  }
}

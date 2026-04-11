import { ChangeDetectorRef, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DefaultService } from '../../openapi/api/default.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login {
  email: string = '';
  password: string = '';
  message: string = '';
  
  constructor(private service: DefaultService,private cd: ChangeDetectorRef) {
    let userName
    if (typeof window !== 'undefined' && sessionStorage) {
      userName = sessionStorage.getItem('userName') || '';
      if (userName) {
        window.location.href = '/home';
      }
    }
  }

onSubmit(): void {
  console.log("Button pressed");
  if (!this.email || !this.password) {
    console.error('Email and password are required');
    return;
  }
  this.service.loginLoginGet(this.email, this.password).subscribe({
    next: (response: string[]) => {
      // Handle the response from the API service
      if (response == null) {
        console.error('User not found');
        this.cd.detectChanges();
        this.message = 'Incorrect loign details';
      } else {
        console.log(response);
        sessionStorage.setItem('userID', this.email);
        sessionStorage.setItem('userName', response[0]);
        sessionStorage.setItem('User_type', response[1]);
        console.log(sessionStorage.getItem('userName'))
        window.location.href = '/home';
      }
    },
    error: (error) => {
      // Handle any errors from the API service
      console.error(error);

    },
    complete: () => {
      // Handle the completion of the API service call
      console.log('API call completed');
    }
  });
}
}

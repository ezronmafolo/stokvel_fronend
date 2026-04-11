import { Component } from '@angular/core';
import { DefaultService } from '../../openapi/api/default.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {  
  userName: string = '';
  loggedIn: boolean = false;

  constructor(private service: DefaultService) {
    if (typeof window !== 'undefined' && sessionStorage) {
      this.userName = sessionStorage.getItem('userName') || '';
    }
    if (this.userName) {
      console.log(this.userName);
    }else{
      console.log('No user logged in');
    }
  }

  topUsers: string[] = [];

  ngOnInit(): void {
    if(
      this.userName){
    this.service.getTopTopGet().subscribe({
      next: response => {
        console.log(response);
        this.topUsers = response;
      },
      error: error => {
        console.log(error);
      }
    })
  }
  }

}

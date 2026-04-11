import { Component, signal } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ApiModule } from '../openapi/api.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, RouterLink, HttpClientModule, ApiModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App {
    loggedIn: string = ''
    constructor() {
    if (typeof window !== 'undefined' && sessionStorage) {
      this.loggedIn = sessionStorage.getItem('User_type') || '';
    }
  }
  protected readonly title = signal('stokvel_front');

  isLoggedIn(): boolean {
    return !!sessionStorage.getItem('userSession');
  }

  getSession(): any {
    const data = sessionStorage.getItem('userSession');
    return data ? JSON.parse(data) : null;
  }

  clearSession(): void {
    sessionStorage.clear();
    window.location.href = '/home';
  }

  getStatement():void {
    const id =sessionStorage.getItem('userID');
    window.location.href = '/statement/'+id
  }


}


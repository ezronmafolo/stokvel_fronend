import { ChangeDetectorRef, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { User } from '../../openapi/model/user';
import { DefaultService } from '../../openapi/api/default.service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-allusers',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './allusers.html',
  styleUrls: ['./allusers.css'],
})
export class Allusers {
    users: User[] = [];

  constructor(private service: DefaultService, private router: Router, private cd: ChangeDetectorRef) {    
      let user_type
    if (typeof window !== 'undefined' && sessionStorage) {
      user_type = sessionStorage.getItem('User_type') || '';
      if (user_type == 'Admin') {
        this.router.navigate(['/home']);
      }
    }
  }

    ngOnInit(): void {
      this.service.rootGet().subscribe({
        next: response => {
          this.users = response;
          this.cd.detectChanges();
          console.log(this.users);
        },
        error: error => {
          console.log(error);
        }
      });
    }
    
}

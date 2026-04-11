import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DefaultService } from '../../openapi/api/default.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-resetpassword',
  imports: [FormsModule],
  templateUrl: './resetpassword.html',
  styleUrl: './resetpassword.css',
})
export class Resetpassword {
  userId: string = '';
  newPassword: string = '';
  confirmPassword: string = '';
  message: string = '';
  name: string = '';

  constructor(private route: ActivatedRoute, private service: DefaultService) {}

  ngOnInit(): void {
    // Get userId from URL
    let Id = this.route.snapshot.queryParamMap.get('token') || '';
    console.log(Id);
    // Call resetPasswordPost with empty password before page loads
    this.service.resetPasswordResetPasswordPost(Id, '').subscribe({
      next: (res) => {
        
        console.log('User ID validated:', res);
        this.userId = res[0];
        this.name = res[1];
      },
      error: (err) => {
        console.error('Error validating user ID:', err);
      }
    });
  }

  passwordsMatch(): boolean {
    return this.newPassword === this.confirmPassword;
  }

  onSubmit(): void {
    if (this.passwordsMatch()) {
      this.service.resetPasswordResetPasswordPost(this.userId, this.newPassword).subscribe({
        next: (res) => {
          this.message = 'Password reset successfully!';
          window.location.href = '/login';
        },
        error: (err) => {
          this.message = 'Error resetting password. Please try again.';
          console.error(err);
        }
      });
    } else {
      this.message = 'Passwords do not match.';
    }
  }
}

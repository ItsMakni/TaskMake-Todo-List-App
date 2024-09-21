import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [FormsModule, NavigationComponent, CommonModule],
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {

  signupObj: any = {
    name: '',
    username: '',
    password: ''
  };

  authService = inject(AuthService);
  errorMessages: string[] = [];

  constructor(private router: Router) { }

  onSignup() {
    this.authService.signup(this.signupObj).subscribe(
      (response) => {
        this.showNotification('Signup Successful');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.errorMessages = error.error.message || ['Signup Failed'];
        this.showNotification(this.errorMessages[0] ?? 'An unknown error occurred');
      }
    );
  }

  showNotification(errorMessages: string) {
    console.log(errorMessages);
  }

}

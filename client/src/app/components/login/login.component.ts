import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { NavigationComponent } from '../navigation/navigation.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, NavigationComponent, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginObj: any = {
    username: '',
    password: ''
  };

  authService = inject(AuthService);
  errorMessage: string | null = null;

  constructor(private router: Router) { }

  onLogin() {
    this.authService.login(this.loginObj).subscribe(
      (response) => {
        this.showNotification('Login Successful');
        localStorage.setItem('token', response.token);
        this.router.navigate(['/tasks']);
      },
      (error) => {
        this.errorMessage = 'Username or password are incorrect';
      }
    );
  }

  showNotification(errorMessage: string) {
    console.log(errorMessage);
  }

}

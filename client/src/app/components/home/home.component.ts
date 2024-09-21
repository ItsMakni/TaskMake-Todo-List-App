import { Component } from '@angular/core';
import { NavigationComponent } from '../navigation/navigation.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [NavigationComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  constructor(private router: Router) { }

  login() {
    this.router.navigate(['/login']);
  }

  contact() {
    window.location.href = 'https://www.linkedin.com/in/itsmakni/';
  }


}

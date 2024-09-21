import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { BrowserStorageService } from '../../services/browser-storage.service';

@Component({
  selector: 'app-navigation',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './navigation.component.html',
  styleUrl: './navigation.component.css'
})
export class NavigationComponent {

  isLoggedIn: boolean = false;

  constructor(private router: Router, private storageService: BrowserStorageService) { }


  ngOnInit() {
    const token = this.storageService.getItem('token');
    this.isLoggedIn = !!token;
  }

  logout() {
    this.storageService.removeItem('token');
    this.isLoggedIn = false;
    this.router.navigate(['/']);

  }

  login() {
    this.router.navigate(['/login']);
  }

  signup() {
    this.router.navigate(['/signup']);
  }




}

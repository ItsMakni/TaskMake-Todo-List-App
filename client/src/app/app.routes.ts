import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { TaskComponent } from './components/task/task.component';
import { HomeComponent } from './components/home/home.component';
import { authGuard } from './guard/auth.guard';
import { taskGuard } from './guard/task.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [taskGuard] },
  { path: 'login', component: LoginComponent, canActivate: [taskGuard] },
  { path: 'signup', component: SignupComponent, canActivate: [taskGuard] },
  { path: 'tasks', component: TaskComponent, canActivate: [authGuard] },
  { path: '**', redirectTo: '' }
];

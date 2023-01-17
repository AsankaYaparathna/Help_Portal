import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/Home/component/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { AdminHomeComponent } from './pages/Admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './pages/Admin/admin-login/admin-login.component';

const routes: Routes = [
  {
    path:'home',
  component: HomeComponent
  },
  {
    path:'',redirectTo:'home',pathMatch:'full'
  },{
    path:'login',
  component: LoginComponent
  },
  {
    path:'signup',
  component: SignupComponent
  },
  {
    path:'admin-dashbord',
  component: AdminHomeComponent
  },
  {
    path:'admin-login',
  component: AdminLoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

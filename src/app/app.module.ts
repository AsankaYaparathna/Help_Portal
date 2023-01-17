import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';


import { MatSidenavModule } from '@angular/material/sidenav';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTableModule } from '@angular/material/table';
import { MatBadgeModule } from '@angular/material/badge';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HttpClientModule } from '@angular/common/http';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatLabel} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/Home/component/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';

import { ReactiveFormsModule } from '@angular/forms';

import { FooterComponent } from './components/footer/footer.component';
import { PostComponent } from './pages/Home/component/post/post.component';
import { PostService } from './services/post/post.service';
import { UserService } from './services/user/user.service';
import { LeftNavComponent } from './components/left-nav/left-nav.component';
import { AdminHomeComponent } from './pages/Admin/admin-home/admin-home.component';
import { AdminLoginComponent } from './pages/Admin/admin-login/admin-login.component';


@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    PostComponent,
    LeftNavComponent,
    AdminHomeComponent,
    AdminLoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatGridListModule,
    MatMenuModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatExpansionModule,
    MatListModule,
    MatToolbarModule,
    MatTableModule,
    MatBadgeModule,
    MatSnackBarModule,
    HttpClientModule,
    MatFormFieldModule,
    ReactiveFormsModule,MatInputModule
  ],
  providers: [PostService,UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }

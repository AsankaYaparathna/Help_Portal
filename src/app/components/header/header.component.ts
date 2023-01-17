import { Component, Input, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { PostService } from '../../services/post/post.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  LogedUser : string  = '';
  apiSubscriptiion: Subscription | undefined;
  AdminLogedStatus: boolean =
  sessionStorage.getItem("adminLog") !== null ? true : false;
  constructor(private router: Router, private _snackBar : MatSnackBar, private postService:PostService,) { 
  }
  

  @Input()
  get UserId():string{
    return this.LogedUser;
  }

  set UserId(email : string){
    this.LogedUser=email;
  }

  ngOnInit(): void {
    this.LogedUser = <string> ((sessionStorage.getItem('email') !==null) ? sessionStorage.getItem('email'):'');
    
  }

  LogOut() : void{
    sessionStorage.removeItem('email');
    this.router.navigate(['/login']);
    
  }
}

import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';

import { UserService } from '../../services/user/user.service'
import { ApiResponce } from 'src/app/models/apiResponce.model';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.css']
})



export class LoginComponent implements OnInit {

  @Output() newItemEvent = new EventEmitter<string>();
  
  hide: boolean = true;
  api:ApiResponce | undefined;
  apiSubscriptiion: Subscription | undefined;

  emailFormControl = new FormControl('', [Validators.required, Validators.email]);


  constructor(private fb: FormBuilder, private userService : UserService, private router: Router, private _snackBar : MatSnackBar) { }
  LogedUser : string  = '';
  ngOnInit(): void { 
    
    this.apiSubscriptiion = this.userService.getAllUser()
    .subscribe((_api)=>{
      this.api=_api;
    });
    sessionStorage.clear();

    this.LogedUser = '';

    
  }

  loginForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  })



  // onLogin() {
  //   if (!this.loginForm.valid) {
  //     return;
  //   }
  //   var un =this.loginForm.value.email;
  //   var pw =this.loginForm.value.password;
   
  //   var apiRes:ApiResponce | undefined;

  //   this.apiSubscriptiion = this.userService.getAllUser()
  //   .subscribe((_api)=>{
  //     apiRes=_api;
  //     this.router.navigate(['/dashboard']);

  //   });

  //  for(let item in this.api?.data){
  //   var temp = this.api?.data[item];
    
  //   if(temp['email']==un && temp['password']==pw)
  //   {
  //     apiRes =<ApiResponce>{
  //       "status": this.api?.status, 
  //       "message": this.api?.message,
  //       "data":temp
  //     }
  //   }
  //  }

  //  if(apiRes !== undefined){
  //   if(apiRes.status){
  //     sessionStorage.setItem('email',apiRes.data['email']);
  //     this._snackBar.open('Login Successfull','Ok',{duration:3000});
  //     this.router.navigate(['/home']);
  //   }
    
  //  }
   
   
  // }

  onLogin() {
    if (!this.loginForm.valid) {
      return;
    }
    var un =this.loginForm.value.email;
    var pw =this.loginForm.value.password;
   
    this.apiSubscriptiion = this.userService.UserLoginCheck(un,pw)
    .subscribe((_api)=>{
      if(_api.status){
        sessionStorage.setItem('email',_api.data);
        this._snackBar.open('Login Successfull','Ok',{duration:3000});
        this.newItemEvent.emit(_api.data);
        this.router.navigate(['/home']);
        
      }

    });
   
  }

}

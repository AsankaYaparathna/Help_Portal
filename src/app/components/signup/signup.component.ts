import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl,
} from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiResponce } from "src/app/models/apiResponce.model";
import { User } from "src/app/models/user.model";
import { UserService } from "../../services/user/user.service";

@Component({
  selector: "app-signup",
  templateUrl: "signup.component.html",
  styleUrls: ["./signup.component.css"],
})
export class SignupComponent implements OnInit {
  hide: boolean = true;
  hideC: boolean = true;

  api: ApiResponce[] = [];
  apiSubscriptiion: Subscription | undefined;

  emailFormControl = new FormControl("", [
    Validators.required,
    Validators.email,
  ]);
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router: Router,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {}
  
  signUpForm: FormGroup = this.fb.group({
    fName: ["", [Validators.required, Validators.minLength(1)]],
    lName: ["", [Validators.required, Validators.minLength(1)]],
    nic: ["", [Validators.required, Validators.minLength(9)]],
    mobileNumber: ["", [Validators.required, Validators.minLength(9)]],
    address: ["", [Validators.required, Validators.minLength(1)]],
    email: ["", [Validators.required, Validators.email]],
    password: ["", [Validators.required, Validators.minLength(6)]],
    cPassword: ["", [Validators.required, Validators.minLength(6)]],
  });

  onLogin() {
    if (!this.signUpForm.valid) {
      return;
    }
    var pw = this.signUpForm.value.password;
    var cpw = this.signUpForm.value.cPassword;

    if (pw === cpw) {
      var user = {
        fName: this.signUpForm.value.fName,
        lName: this.signUpForm.value.lName,
        fullName:
          this.signUpForm.value.fName + " " + this.signUpForm.value.lName,
        address: this.signUpForm.value.address,
        email: this.signUpForm.value.email,
        mobileNumber: this.signUpForm.value.mobileNumber,
        password: this.signUpForm.value.password,
        isActive: true,
        userType: "End User",
      };

      this.apiSubscriptiion = this.userService
        .createUser(user)
        .subscribe((_api) => {
          if (_api.status) {
            this._snackBar.open("User account created.!", "Ok", {
              duration: 3000,
            });
            this.router.navigate(["/login"]);
          } else {
            this._snackBar.open("Login failed.!" + _api.message, "Try again", {
              duration: 3000,
            });
            this.router.navigate(["/signup"]);
          }
        });
    }
  }

  onLogin2() {
    var pw = "a";
    var cpw = "a";

    if (pw === cpw) {
      var user = {
        fName: "Asanka",
        lName: "Yaparathna",
        fullName: "Asanka Yaparathna",
        address: "Kandy",
        email: "ay10@gmail.com",
        mobileNumber: 756019387,
        password: "a",
        isActive: true,
        userType: "End User",
      };

      this.apiSubscriptiion = this.userService
        .createUser(user)
        .subscribe((_api: ApiResponce) => {
          this.api.push(_api);
          sessionStorage.setItem("_api", JSON.stringify(_api));
        });

      console.log("*** =><= ***");
      var data = JSON.parse(<string>sessionStorage.getItem("_api"));

      if (data.status) {
        this._snackBar.open("Login Successfull", "Ok", { duration: 3000 });
        this.router.navigate(["/login"]);
      } else {
        this._snackBar.open(
          "Login failed.! Email Address already exist",
          "Try again",
          { duration: 3000 }
        );
      }
    }
  }
}

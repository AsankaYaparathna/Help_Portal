import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Router } from "@angular/router";
import { Subscription } from "rxjs";
import { ApiResponce } from "src/app/models/apiResponce.model";
import { Post } from "src/app/models/post.model";
import { PostService } from "../../../../services/post/post.service";
import { UserService } from "../../../../services/user/user.service";

@Component({
  selector: "app-home",
  templateUrl: "home.component.html",
  styleUrls: ["./home.component.css"],
})
export class HomeComponent implements OnInit {
  api: ApiResponce[] = [];
  apiMy: ApiResponce[] = [];
  apiSubscriptiion: Subscription | undefined;

  allAprovedPost: Array<Post> | undefined;
  allPost: Array<Post> | undefined;
  showFiller = true;

  LogedStatus: boolean =
    sessionStorage.getItem("email") !== null ? true : false;
  LogedUser: string = <string>(
    (sessionStorage.getItem("email") !== null
      ? sessionStorage.getItem("email")
      : "")
  );
  LogedUserName: string | undefined;
  LogedUserID: string | undefined;

  CreatePostKey: boolean = false;
  DisplayAllPost: boolean = true;
  EditMyProfile: boolean = false;
  MyPost: boolean = false;

  imageArray: ImageBitmap[] = [];
  imageProfileArray: ImageBitmap[] = [];
  hide: boolean = true;
  hideC: boolean = true;

  src : string ='../../../../../assets/img/user.png';

  constructor(
    private postService: PostService,
    private router: Router,
    private userService: UserService,
    private fb: FormBuilder,
    private _snackBar: MatSnackBar
  ) {}

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

  ngOnInit(): void {
    this.getAllApprovedPost();

    if (this.api.length >= 1) {
      this.CreatePostKey = false;
    }

    if (this.LogedUser !== "") {
      this.UserStstus();
    }
  }

  createPostForm: FormGroup = this.fb.group({
    title: ["", [Validators.required, Validators.minLength(1)]],
    description: ["", [Validators.required, Validators.minLength(1)]],
  });

  UserStstus(): void {
    this.apiSubscriptiion = this.userService
      .getUser(this.LogedUser)
      .subscribe((_api: ApiResponce) => {
        this.LogedUserName = _api.data["fName"] + " " + _api.data["lName"];
        this.LogedUserID = _api.data["_id"];

        sessionStorage.setItem('userId',_api.data["_id"]);
      });
  }

  getAllApprovedPost(): void {
    this.apiSubscriptiion = this.postService
      .getAllPost()
      .subscribe((_api: ApiResponce) => {
        var data = _api.data;

        var dto: any[] = [];

        for (let x of data) {
          if (x["isApproved"]) {
            dto.push(x);
          }
        }

        var newApi: ApiResponce = {
          data: dto,
          status: _api.status,
          message: _api.message,
        };
        this.api.push(newApi);
      });

    var post = {
      userId: this.LogedUserID,
    };

    this.apiSubscriptiion = this.postService
      .getAllPost()
      .subscribe((_api: ApiResponce) => {
        var data = _api.data;

        var dto: any[] = [];

        for (let x of data) {
          if (x["userId"] === this.LogedUserID) {
            dto.push(x);
          }
        }
        console.log(dto.indexOf(0));

        if (dto.indexOf(0) == -1 && this.LogedStatus) {
          this.CreatePostKey = true;
        }

        var newApi: ApiResponce = {
          data: dto,
          status: _api.status,
          message: _api.message,
        };

        this.apiMy.push(newApi);
      });
  }

  LogOut(): void {
    sessionStorage.removeItem("email");
    this.LogedUser = "";
    this.LogedStatus = false;
    this.DisplayAllPost = true;
    this.router.navigate(["/home"]);

    if (this.api.length <= 1 && !this.LogedStatus) {
      this.router.navigate(["/login"]);
    }
  }

  Login(): void {
    this.router.navigate(["/login"]);
  }

 

  onCreatePost(): void {
    if (!this.createPostForm.valid) {
      return;
    }

    this.CreatePostKey = false;
    this.EditMyProfile = false;
    this.DisplayAllPost = true;
    this.MyPost = false;

    

    var post = {
      userId: this.LogedUserID,
      fullName: this.LogedUserName,
      title: this.createPostForm.value.title,
      description: this.createPostForm.value.description,
      publishedDate: new Date(),
      approvedDate: new Date(),
      images: this.imageArray,
      isActive: true,
      isApproved: false,
    };
    this.apiSubscriptiion = this.postService
      .createPost(post)
      .subscribe((_api) => {
        if (_api.status) {
          this._snackBar.open("Post Added.!", "Ok", { duration: 3000 });
          this.router.navigate(["/home"]);
          window.location.reload();
        } else {
          this._snackBar.open("Posting failed.!" + _api.message, "Try again", {
            duration: 3000,
          });
          //this.router.navigate(["/signup"]);
        }
      });
  }

  onSelectImage(e: any) {
    if (e.target.files) {
      var reader = new FileReader();
      var imageLength = e.target.files.length;

      if (this.imageArray.length <= 2) {
        for (let x = 0; x < imageLength; x++) {
          reader.readAsDataURL(e.target.files[x]);
          reader.onload = (event: any) => {
            this.imageArray.push(event.target.result);
          };
        }
      } else {
        this._snackBar.open("Only three images can upload.!", "Try again", {
          duration: 3000,
        });
      }
    }
  }

  onSelectProfileImage(e: any) {
    if (e.target.files) {
      var reader = new FileReader();

      reader.readAsDataURL(e.target.files[0]);
          reader.onload = (event: any) => {
            this.imageProfileArray.push(event.target.result);
            this.src = event.target.result;
          };
    }
  }

  canselSharePost(): void {
    window.location.reload();
  }

  MyPostButtton(): void {
    this.CreatePostKey = false;
    this.EditMyProfile = false;
    this.DisplayAllPost = false;
    this.MyPost = true;
  }

  AllPostButtton(): void {
    this.CreatePostKey = true;
    this.EditMyProfile = false;
    this.DisplayAllPost = true;
    this.MyPost = false;
  }

  EditProfile(): void {
    this.DisplayAllPost = false;
    this.CreatePostKey = false;
    this.EditMyProfile = true;
    this.MyPost = false;
  }

  CreateNewPost(): void {
    this.CreatePostKey = true;
    this.DisplayAllPost = false;
    this.EditMyProfile = false;
    this.MyPost = false;
    
  }

  onUpdate():void{

  }
}

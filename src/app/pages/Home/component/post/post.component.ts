import { Component, OnInit, Input } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { loadStripe } from '@stripe/stripe-js';
import { Subscription } from 'rxjs';
import { ApiResponce } from 'src/app/models/apiResponce.model';
import { Post } from 'src/app/models/post.model';
import { PostService } from '../../../../services/post/post.service';

@Component({
  selector: 'app-post',
  templateUrl:'post.component.html',
  styleUrls:['./post.component.css']
})
export class PostComponent implements OnInit {

  constructor(
    private postService : PostService,
    private router: Router,
    private _snackBar: MatSnackBar
    ) { }


  api: ApiResponce[] = [];
  apiSubscriptiion: Subscription | undefined;

  LogedStatus: boolean =
  sessionStorage.getItem("email") !== null ? true : false;

  @Input() allPost : Post | undefined;
  ngOnInit(): void {
    
  }

   Donate():void{

    var post = {
      userId: this.allPost?.userId,
      fullName: this.allPost?.fullName,
      title: this.allPost?.title,
      description: this.allPost?.description,
      publishedDate: this.allPost?.publishedDate,
      approvedDate: this.allPost?.approvedDate,
      images: this.allPost?.images,
      isActive: this.allPost?.isActive,
      isApproved: this.allPost?.isApproved,
    };

    this.apiSubscriptiion = this.postService
    .CheckOut(post)
    .subscribe(async (_api) => {
      let stripe = await loadStripe('pk_test_51JbsYvEuUC9aV6lbIUYbhLv98gPrVf34NTSfRnxFreJaSvl9BcotKX3daFzLnmU3BcteyujKVcyWxgdviVdYUkRP00JXL8ySGG');
        stripe?.redirectToCheckout({
          sessionId: _api.id,
        });

      console.log(_api);

      });
     
  }

}

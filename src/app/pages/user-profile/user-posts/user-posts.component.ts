import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { of, switchMap, take } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/services/post/types/post.type';
import { User } from 'src/app/services/user/types/user.type';

@UntilDestroy()
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  @Input() user: User | undefined;
  userId: string;
  posts: Post[] | undefined;
  isLoading = false;

  constructor(private readonly postService: PostService, private readonly route: ActivatedRoute) {
    this.userId = this.route.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.postService.arePostsLoaded$.asObservable().pipe(switchMap(areLoaded => {
      this.isLoading = true;
      if (areLoaded){
        return this.postService.getPostsByUserId(this.userId);
      }
      else {
        return of(undefined);
      }

    }), untilDestroyed(this)).subscribe(data => {
      this.isLoading = false;
      if (data) {
        this.posts = data;
        console.log(this.posts);
        this.posts.forEach(post => {
          post.dateObj = new Date(+post.date);
        });
      }
    });
    // this.postService
    //   .getPostsByUserId(this.userId)
    //   .pipe(take(1))
    //   .subscribe(data => {
    //     this.posts = data;
    //     this.posts.forEach(post => {
    //       post.dateObj = new Date(+post.date);
    //     });
    //   });
  }
}

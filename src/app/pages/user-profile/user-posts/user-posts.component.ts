import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/services/post/types/post.type';

@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.css']
})
export class UserPostsComponent implements OnInit {
  posts: Post[] | undefined;

  constructor(private readonly postService: PostService) {}

  ngOnInit(): void {
    this.postService
      .getPostsByUserId('9KMjRrYVsTgxZnGZgdNoKdHMNzI2')
      .pipe(take(1))
      .subscribe(data => {
        this.posts = data;
        this.posts.forEach(post => {
          post.dateObj = new Date(+post.date);
        });
      });
  }
}

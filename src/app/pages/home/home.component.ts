import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { Post } from 'src/app/services/post/types/post.type';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts?: Post[];
  isLoading = true;
 
  constructor(private readonly postService: PostService) { }

  ngOnInit(): void {
    this.postService.getAllPosts().pipe(take(1)).subscribe(data => {
      this.posts = data;
      this.posts.forEach(post => {
        post.dateObj = new Date(+post.date);
      });
      this.isLoading = false;
    });
  }
}

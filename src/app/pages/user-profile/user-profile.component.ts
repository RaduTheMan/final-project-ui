import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, take } from 'rxjs';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/services/user/types/user.type';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit{
  userId: string;
  user: User | undefined;
  isLoading: boolean = false;

  constructor(
    private readonly userService: UserService, 
    private readonly activatedRoute: ActivatedRoute) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }
  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(this.userId).pipe(take(1)).subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
  }
}

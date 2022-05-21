import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/services/user/types/user.type';
import { UserService } from 'src/app/services/user/user.service';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {

  userId: string;
  user?: User;
  address?: string;
  constructor(private readonly userService: UserService, private activatedRoute: ActivatedRoute) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.userService.getUser(this.userId).pipe(take(1)).subscribe(user => {
      this.user = user;
      this.address = `${user.city} - ${user.country}`;
    });
  }
}

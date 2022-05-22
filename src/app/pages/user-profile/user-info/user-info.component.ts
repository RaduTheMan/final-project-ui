import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, switchMap, take } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { User } from 'src/app/services/user/types/user.type';
import { UserService } from 'src/app/services/user/user.service';
import { toBase64 } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  @ViewChild('uploadImageRef') uploadImageRef!: ElementRef;
  selectedFile: File | null = null;
  userId: string;
  user?: User;
  address?: string;
  isLoading: boolean = false;

  constructor(private readonly userService: UserService, private activatedRoute: ActivatedRoute, private imageService: ImageService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
  }

  ngOnInit(): void {
    this.isLoading = true;
    this.userService.getUser(this.userId).pipe(take(1)).subscribe(user => {
      this.user = user;
      this.address = `${user.city} - ${user.country}`;
      this.isLoading = false;
    });
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
    this.uploadImage();
  }

  uploadButtonClicked() {
    this.uploadImageRef.nativeElement.click();
  }

  uploadImage(): void {
    this.isLoading = true;
    const toBase64Obs = from(toBase64(this.selectedFile!));
    toBase64Obs.pipe(switchMap(base64 => {
      const value = base64 as string;
      return this.imageService.uploadImage({ image: value }, this.userId);
    })).pipe(untilDestroyed(this), switchMap(response => {
      return this.userService.getUser(this.userId);
    })).subscribe(user => {
      this.user = user;
      this.isLoading = false;
    });
  }
}

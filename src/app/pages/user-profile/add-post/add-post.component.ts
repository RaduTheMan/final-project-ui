import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, of, switchMap } from 'rxjs';
import { AuthService } from 'src/app/services';
import { PostService } from 'src/app/services/post/post.service';
import { User } from 'src/app/services/user/types/user.type';
import { toBase64 } from 'src/app/shared/utils';

@UntilDestroy()
@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.css']
})
export class AddPostComponent {
  @ViewChild('uploadImageRef') uploadImageRef!: ElementRef;
  @Input() user?: User;

  addOnBlur = true;
  selectedFile: File | null = null;
  formGroup: FormGroup;
  userId: string;

  constructor(private activatedRoute: ActivatedRoute, private postService: PostService) {
    this.userId = this.activatedRoute.snapshot.params['userId'];
    this.formGroup = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.maxLength(100)]),
      content: new FormControl(null, [Validators.required, Validators.minLength(50)])
    });
  }

  remove(): void {
    this.selectedFile = null;
  }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
  }

  onAddPictures(): void {
    console.log('here');
    this.uploadImageRef.nativeElement.click();
  }

  onPost(): void {
    const formValue = { ...this.formGroup.getRawValue(), name: this.user?.name, imgUrl: this.user?.imageUrl };
    this.formGroup.reset();
    this.postService.arePostsLoaded$.next(false);
    if (this.selectedFile) {
      const toBase64Obs = from(toBase64(this.selectedFile!));
      this.selectedFile = null;
      toBase64Obs
        .pipe(
          switchMap(base64 => {
            const image = base64 as string;
            return this.postService.createPost({ ...formValue, image }, this.userId);
          }),
          untilDestroyed(this)
        )
        .subscribe(_ => {
          this.postService.arePostsLoaded$.next(true);
        });
    } else {
      this.postService.createPost(formValue, this.userId).pipe(untilDestroyed(this)).subscribe(_ => {
        this.postService.arePostsLoaded$.next(true);
      });
    }
  }
}

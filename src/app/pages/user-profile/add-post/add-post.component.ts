import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { from, of, switchMap } from 'rxjs';
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
  isLoading: boolean = false;
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
    console.log('In file selected');
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onAddPictures(): void {
    console.log('here');
    this.uploadImageRef.nativeElement.click();
  }

  onPost(): void {
    console.log(this.formGroup.getRawValue());
    this.isLoading = true;
    const formValue = { ...this.formGroup.getRawValue(), name: this.user?.name, imgUrl: this.user?.imageUrl };
    if (this.selectedFile) {
      const toBase64Obs = from(toBase64(this.selectedFile!));
      toBase64Obs
        .pipe(
          switchMap(base64 => {
            const image = base64 as string;
            return this.postService.createPost({ ...formValue, image }, this.userId);
          }),
          untilDestroyed(this)
        )
        .subscribe();
    } else {
      this.postService.createPost(formValue, this.userId).pipe(untilDestroyed(this)).subscribe();
    }
  }
}

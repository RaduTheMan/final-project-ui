import { Component } from '@angular/core';
import { from, switchMap } from 'rxjs';
import { ImageService } from 'src/app/services/image/image.service';
import { toBase64 } from 'src/app/shared/utils';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {

  selectedFile: File | null = null;

  constructor(private readonly imageService: ImageService) { }

  onFileSelected(event: any): void {
    this.selectedFile = event.target.files[0];
    console.log(this.selectedFile);
  }

  onUpload(): void {
    const toBase64Obs = from(toBase64(this.selectedFile!));
    toBase64Obs.pipe(switchMap(base64 => {
      const value = base64 as string;
      return this.imageService.uploadImage({ image: value });
    })).subscribe();
  }

}

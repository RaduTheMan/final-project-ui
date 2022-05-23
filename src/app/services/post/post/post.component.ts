import { Component, Input, OnDestroy } from '@angular/core';
import { pipe, take } from 'rxjs';
import { AuthService } from '../../auth.service';
import { PostService } from '../post.service';
import { Post } from '../types/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnDestroy {

  @Input() post!: Post;
  selectedLanguage: string = 'en';
  isLoadingAudio = false;
  isLoadingTranslate = false;
  isPlayed = false;
  snd?: HTMLAudioElement;
  languages: {
    value: string;
    display: string;
  }[] = [
    {
      value: 'en',
      display: 'English'
    },
    {
      value: 'fr',
      display: 'French'
    },
    {
      value: 'es',
      display: 'Spanish'
    },
    {
      value: 'de',
      display: 'German'
    },
    {
      value: 'ro',
      display: 'Romanian'
    }
  ];

  constructor(private readonly postService: PostService, readonly authService: AuthService) { }

  ngOnDestroy(): void {
    this.snd?.pause();
  }

  onTranslate(post: Post): void {
    this.isLoadingTranslate = true;
    this.postService.translatePost(post.title, post.content, this.selectedLanguage).pipe(take(1)).subscribe(data => {
      post.content = data.translatedContent;
      post.title = data.translatedTitle;
      this.snd?.pause();
      this.isPlayed = false;
      this.snd = undefined;
      this.isLoadingTranslate = false;
    });
  }

  onListen(post: Post): void {
    if (!this.snd){
      this.isLoadingAudio = true;
      this.postService.getAudioFromPost(post.title, post.content).pipe(take(1)).subscribe(audio => {
        this.snd = new Audio('data:audio/wav;base64,' + audio);
        this.isLoadingAudio = false;
        this.isPlayed = true;
        this.snd.play();
      });
    } else {
      this.snd.play();
      this.snd.onended = () => {
        this.isPlayed = false;
      };
      this.isPlayed = true;
    }
  }

  onPause(): void {
    this.isPlayed = false;
    this.snd?.pause();
  }
}

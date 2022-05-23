import { Component, Input, OnInit } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { PostService } from '../post.service';
import { Post } from '../types/post.type';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {

  @Input() post!: Post;
  selectedLanguage: string = 'en';
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

  constructor(private readonly postService: PostService) { }

  onTranslate(post: Post): void {
    this.postService.translatePost(post.title, post.content, this.selectedLanguage).subscribe(data => {
      post.content = data.translatedContent;
      post.title = data.translatedTitle;
    });
  }

  onListen(post: Post): void {
    if (!this.snd){
      this.postService.getAudioFromPost(post.title, post.content).subscribe(audio => {
        this.snd = new Audio('data:audio/wav;base64,' + audio);
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

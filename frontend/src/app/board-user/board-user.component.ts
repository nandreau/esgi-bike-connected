import { Component, OnInit, HostListener, OnDestroy, ViewChild } from '@angular/core';
import { UserService } from '../_services/user.service';
import { Subscription, interval, takeUntil } from 'rxjs';
@Component({
  selector: 'app-board-user',
  templateUrl: './board-user.component.html',
  styleUrls: ['./board-user.component.css']
})
export class BoardUserComponent implements OnInit, OnDestroy {
  content?: string;
  count: number = 0;
  api:any;
  private timerSubscription!: Subscription;

  @ViewChild('media') media!: any;

  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getUserBoard().subscribe({
      next: data => {
        this.content = data;
      },
      error: err => {
        if (err.error) {
          try {
            const res = JSON.parse(err.error);
            this.content = res.message;
          } catch {
            this.content = `Error with status: ${err.status} - ${err.statusText}`;
          }
        } else {
          this.content = `Error with status: ${err.status}`;
        }
      }
    });

    // Start sending POST requests every 10 seconds
  }

  onPlayerReady(api: any) {
    this.api = api;
    this.api.getDefaultMedia().subscriptions.loadedMetadata.subscribe(
        this.playVideo.bind(this)
    );
  }

  playVideo() {
    this.api.play();
    this.timerSubscription = interval(1500).subscribe(() => {
      this.userService.postSpeedPlayer(this.count).subscribe({
        next: data => {
          console.log(data)
          this.api.playbackRate = data.message;
        },
        error: err => {
        }
      });
      this.count=0;
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from timer subscription to avoid memory leaks
    this.timerSubscription.unsubscribe();
  }

  @HostListener('document:keydown', ['$event'])
  onKeyDown(event: KeyboardEvent) {
    this.count++;
  }
}
import { AfterViewInit, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicDataService } from '../../service/music-data.service';
import { music } from '../../service/interfaces';
import { CommonModule } from '@angular/common';
import { Capacitor } from '@capacitor/core';
import { MediaSession } from '@jofr/capacitor-media-session';
import { IonButton, IonFabButton } from '@ionic/angular/standalone';


@Component({
  selector: 'app-music-player',
  standalone: true,
  imports: [FormsModule, CommonModule,IonButton,IonFabButton],
  templateUrl: './music-player.component.html',
  styleUrl: './music-player.component.css',
})
export class MusicPlayerComponent implements AfterViewInit {
  public nowPlayingMusic: music = {
    id: 0,
    picture: '',
    title: '',
    soundPath: '',
    muzikSanatci: '',
  };
  public screenOnOff: boolean = false;
  public screenButton: any;
  public musicScreen: any;
  public soundList: Array<any> = [];
  public voiceLevel: number = 100;
  public musicRange: any;
  public rangeValue: number = 0;
  public musicIndexNow: number = 0;
  public isPlaying: boolean = false;
  public playButton: boolean = this.soundList.length <= 0;
  public backWardButton: boolean = this.musicIndexNow > 0;
  public forWardButton: boolean =
    this.musicIndexNow <= this.soundList.length - 1;
  public musicPlayer: HTMLAudioElement = document.getElementById(
    'audio'
  ) as HTMLAudioElement;
  public playPauseButton: any;
  public autoPlay: boolean = false;

  ngAfterViewInit(): void {
    const audio = document.getElementById('audio') as HTMLAudioElement;
    let range_values = 0;
    this.rangeValue = range_values;
    this.musicRange = document.getElementById('musicRange');
    this.playPauseButton = document.getElementById('playPause')?.classList;
    this.musicPlayer = audio;
    this.musicScreen = document.getElementById('music__player-container');
    this.screenButton = document.getElementById('screenButton');
    audio.addEventListener('pause', () => {
      this.isPlaying = false;
      this.updatePlaybackState();
    });
    audio.addEventListener('play', () => {
      this.isPlaying = true;
      this.updatePlaybackState();

      MediaSession.setMetadata({
        title: this.nowPlayingMusic.title,
        artist: this.nowPlayingMusic.title,
        album: this.nowPlayingMusic.title,
        artwork: [
          {
            src: this.nowPlayingMusic.picture,
            type: 'image/png',
            sizes: '512x512',
          },
        ],
      });
      MediaSession.setActionHandler({ action: 'play' }, () => {
        this.playPause();
      });

      MediaSession.setActionHandler({ action: 'pause' }, () => {
        this.playPause();
      });
      MediaSession.setActionHandler({ action: 'seekto' }, (details) => {
        this.musicPlayer.currentTime =
          details.seekTime !== undefined ? this.musicPlayer.currentTime : 0;
      });
      MediaSession.setActionHandler({ action: 'seekforward' }, (details) => {
        const seekOffset = details.seekTime ?? 30;
        this.musicPlayer.currentTime =
          this.musicPlayer.currentTime + seekOffset;
      });
      MediaSession.setActionHandler({ action: 'seekbackward' }, (details) => {
        const seekOffset = details.seekTime ?? 30;
        this.musicPlayer.currentTime =
          this.musicPlayer.currentTime - seekOffset;
      });
      if(this.forWardButton == true){
      MediaSession.setActionHandler({ action: 'nexttrack' }, () => {
        this.forward();
      });
      }
      if (this.backWardButton == true){
      MediaSession.setActionHandler({ action: 'previoustrack' }, () => {
        this.backward();
      });
      }
    });
    audio.addEventListener('timeupdate', () => {
      this.rangeValue = audio.currentTime;
      if (audio.ended && this.autoPlay) {
        this.forward();
        this.playPause();
      }
      if (audio.ended) {
        this.isPlaying = false;
      }
    });
    //Notification music Controll
    this.musicPlayer.addEventListener(
      'durationchange',
      this.updatePositionState
    );
    this.musicPlayer.addEventListener('seeked', this.updatePositionState);
    this.musicPlayer.addEventListener('ratechange', this.updatePositionState);
    this.musicPlayer.addEventListener('play', this.updatePositionState);
    this.musicPlayer.addEventListener('pause', this.updatePositionState);
  }

  constructor(private musicService: MusicDataService) {
    musicService.list.subscribe((data) => {
      let isIn = false;
      for (let item of this.soundList) {
        if (item.id == data.id) {
          isIn = true;
        }
      }
      if (isIn == false) {
        this.soundList.push(data);
      }
      this.musicIndexNow = this.soundList.indexOf(
        this.soundList.find((music) => music.id == data.id)
      );
      this.musicChange(this.musicIndexNow);
    });
  }

  public async musicChange(musicİndex: number = 0) {
    this.musicIndexNow = musicİndex;
    this.nowPlayingMusic = this.soundList[musicİndex];
    this.nowPlayingMusic.soundPath = Capacitor.convertFileSrc(
      await this.soundList[musicİndex].soundPath
    );
    this.playButton = this.soundList.length <= 0;
    this.forWardButton = this.musicIndexNow < this.soundList.length - 1;
    this.backWardButton = this.musicIndexNow > 0;
  }

  public playPause() {
    if (this.musicPlayer && this.musicPlayer.paused) {
      this.musicRange.max = this.musicPlayer.duration;
      if(this.isPlaying == true){
        this.musicPlayer.addEventListener('loadedmetadata', () => {
          this.musicPlayer.play();
         });
      }
      this.musicPlayer.play();
    } else if (this.musicPlayer) {
      this.musicPlayer.pause();
    }
  }

  public forward() {
    this.musicIndexNow = this.musicIndexNow + 1;
    this.musicChange(this.musicIndexNow);
    this.playPause()

  }

  public backward() {
    this.musicIndexNow = this.musicIndexNow - 1;
    this.musicChange(this.musicIndexNow);
  }
  public setTime() {
    this.musicPlayer.currentTime = this.rangeValue;
  }
  public setVoice() {
    this.musicPlayer.volume = this.voiceLevel / 100;
  }
  public calculateTime = (totalSecond: number) => {
    const minute = Math.floor(totalSecond / 60);
    const second = Math.floor(totalSecond % 60);
    const updatedSecond = second < 10 ? `0${second}` : `${second}`;
    const result = `${minute}:${updatedSecond}`;
    return result;
  };
  public musicScreenControll() {
    if (this.screenOnOff == true) {
      console.log(this.screenOnOff);
      this.musicScreen.style.top = 100 + 'vh';
      this.screenButton.style.top = -140 + 'px';
      this.screenButton.children[0].children[0].classList.remove(
        'fa-arrow-down'
      );
      this.screenButton.children[0].children[0].classList.add('fa-arrow-up');
      this.screenOnOff = false;
    } else {
      this.screenButton.children[0].children[0].classList.remove('fa-arrow-up');
      this.screenButton.children[0].children[0].classList.add('fa-arrow-down');
      this.screenButton.style.top = 20 + 'px';
      this.musicScreen.style.top = 0;
      this.screenOnOff = true;
    }
  }
  public updatePositionState() {
    MediaSession.setPositionState({
      position: this.rangeValue,
      duration: 0,
      playbackRate: this.musicPlayer.playbackRate,
    });
  }
  public updatePlaybackState() {
    const playbackState = !this.isPlaying
      ? 'none'
      : this.musicPlayer.paused
      ? 'paused'
      : 'playing';
    MediaSession.setPlaybackState({
      playbackState: playbackState,
    });
  }
}

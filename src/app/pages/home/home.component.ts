import { Capacitor} from '@capacitor/core';
import { music } from './../../service/interfaces';
import { CommonModule } from '@angular/common';
import { Component, ElementRef, OnInit } from '@angular/core';
import { TopNavComponent } from '../../components/top-nav/top-nav.component';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { MusicListComponent } from '../../components/music-list/music-list.component';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { MusicDataService } from 'src/app/service/music-data.service';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MusicPlayerComponent } from '../../components/music-player/music-player.component';
import { SidebarComponent } from '../../components/sidebar/sidebar.component';
import { Motion } from '@capacitor/motion';
import { App } from '@capacitor/app';
import { AndroidSettings,NativeSettings} from 'capacitor-native-settings';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [TopNavComponent,SongCardComponent,CommonModule,MusicListComponent,RouterLink,RouterOutlet,MusicPlayerComponent,SidebarComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  // public supportedFormat = ['.mp3', '.wav', '.flac', '.aac', '.mp4', '.avi', '.wma', '.ogg','.aiff','.m4a'];
  // public musicFiles:Array<music> = [];
  public sideBar:any = document.getElementById("responsive-sidebar");
  constructor(private musicService : MusicDataService){

  }

  ngOnInit(): void {
    this.sideBar = document.getElementById("responsive-sidebar");
    // Filesystem.checkPermissions().then((a) =>{
    //   if(a.publicStorage =='granted')
    //   {
    //     this.findMusicFilesInDirectory('/');
    //     this.musicService.musicInput(this.musicFiles);
    //   }
    // })
  }
  public sideBarControl(sideButton:boolean){
    if(sideButton == true)
    {
      console.log(sideButton)
      this.sideBar.style.transform = "translateX(" + 0 + "px)"
    }
    else if(sideButton == false) {
      this.sideBar.style.transform = "translateX(" + -70 + "Vw)"
    }
  }

}

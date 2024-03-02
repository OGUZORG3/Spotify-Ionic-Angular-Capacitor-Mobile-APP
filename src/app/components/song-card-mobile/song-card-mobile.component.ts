import { Component, Input } from '@angular/core';
import { IonCard, IonCardContent, IonCardHeader, IonCardSubtitle, IonCardTitle } from '@ionic/angular/standalone';
import { MusicDataService } from 'src/app/service/music-data.service';

@Component({
  selector: 'app-song-card-mobile',
  standalone: true,
  imports:[IonCardContent,IonCardSubtitle,IonCardTitle,IonCardHeader,IonCard],
  templateUrl: './song-card-mobile.component.html',
  styleUrls: ['./song-card-mobile.component.scss'],
})
export class SongCardMobileComponent  {

  @Input() public musicObject:any;

  constructor(private musicService : MusicDataService){

  }
  sendMusicData(){
    this.musicService.musicPlayerSender(this.musicObject);
  }
}

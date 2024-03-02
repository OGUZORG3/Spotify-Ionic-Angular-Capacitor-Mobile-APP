import { Component, Input } from '@angular/core';
import { MusicDataService } from '../../service/music-data.service';

@Component({
  selector: 'app-song-card',
  standalone: true,
  imports: [],
  templateUrl: './song-card.component.html',
  styleUrl: './song-card.component.css'
})
export class SongCardComponent {
  @Input() public musicObject:any;

  constructor(private musicService : MusicDataService){

  }
  sendMusicData(){
    this.musicService.musicPlayerSender(this.musicObject);
  }
}

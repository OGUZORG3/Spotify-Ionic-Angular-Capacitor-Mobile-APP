import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MusicDataService } from '../../service/music-data.service';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { SongCardMobileComponent } from 'src/app/components/song-card-mobile/song-card-mobile.component';

@Component({
  selector: 'app-home-content',
  standalone: true,
  imports: [CommonModule,SongCardComponent,SongCardMobileComponent],
  templateUrl: './home-content.component.html',
  styleUrl: './home-content.component.css'
})
export class HomeContentComponent {
  public musicList1:Array<any> = [];
  constructor(private musicService:MusicDataService){
      this.musicService.musicInput().subscribe(newData => {
        this.musicList1 = newData;
    })


  }
}

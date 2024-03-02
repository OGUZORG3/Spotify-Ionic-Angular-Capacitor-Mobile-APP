import { Component, Input } from '@angular/core';
import { MusicListComponent } from '../../components/music-list/music-list.component';
import { MusicDataService } from '../../service/music-data.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [MusicListComponent ,CommonModule],
  templateUrl: './playlist.component.html',
  styleUrl: './playlist.component.css'
})
export class PlaylistComponent {

  public ThumbNail:string = 'https://placehold.co/400x400';
  public playListData:Array<any> = [{
    playListName:'string',
    playListContent:[
        {
        id:1,
        picture:this.ThumbNail,
        title:"sound",
        soundPath:"../../../assets/musiz/Where Did U Come From - Jennings Couch (LYRICS).m4a",
        muzikSanatci:"Sanatci İsmi"
      },
    ],
  }];
  public musicListData:Array<object> = this.playListData;
  constructor(private musicService:MusicDataService){
    this.playListData=musicService.playListData;
  }
}

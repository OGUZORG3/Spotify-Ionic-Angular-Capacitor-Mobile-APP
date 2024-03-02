import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MusicDataService } from '../../service/music-data.service';
import { SongCardComponent } from '../../components/song-card/song-card.component';
import { SongCardMobileComponent } from 'src/app/components/song-card-mobile/song-card-mobile.component';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule,FormsModule,SongCardComponent,SongCardMobileComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  public musicList: any[] = []; // Müzik listesi
  public filteredMusicList: any[] = []; // Filtrelenmiş müzik listesi
  public keyword:any='';
  constructor(private musicService : MusicDataService){}
  ngOnInit(){
    this.musicService.getAllMusic().subscribe((musics) => this.musicList = musics);
    this.filteredMusicList = this.musicList.filter(music => music.title.toLowerCase().includes(this.keyword.toLowerCase()))
  }
  public onSearch(){
    this.filteredMusicList = this.musicList.filter(music => music.title.toLowerCase().includes(this.keyword.toLowerCase()))
    console.log(this.filteredMusicList)
  }
}

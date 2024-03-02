import { Component, Input, OnInit } from '@angular/core';
import { SongCardComponent } from '../song-card/song-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-music-list',
  standalone: true,
  imports: [SongCardComponent,CommonModule],
  templateUrl: './music-list.component.html',
  styleUrl: './music-list.component.css'
})
export class MusicListComponent implements OnInit {
  @Input() public musicList:Array<any>=[{
    thumbnail:'asdasd',
    title:'Song',
    description:'description'
  },];
  scrolFrontClick(event:any) {
    const scroll = event.target.parentElement.nextElementSibling as HTMLElement | null;
    if(scroll){
    scroll.scrollLeft +=200;
    }
  }
  scrolBackClick(event:any) {
    const scroll = event.target.parentElement.nextElementSibling as HTMLElement | null;
    if(scroll){
    scroll.scrollLeft -=200;
    }
  }
  musicInput(event:any){
    console.log(event)
  }
  ngOnInit(){
  }
}

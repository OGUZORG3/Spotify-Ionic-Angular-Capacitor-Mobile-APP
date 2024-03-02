import { Injectable } from '@angular/core';
import { Observable, Subject, of } from 'rxjs';
import { music } from './interfaces';
import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Injectable({
  providedIn: 'root'
})
export class MusicDataService {
  public ThumbNail:string = 'https://placehold.co/400x400';
  public allSoundList:Array<music> = []
  private dataSubject = new Subject<any[]>();
  public sendMusicList:Subject<any> = new Subject();
  public list:Subject<music> = new Subject();
  public playListData:Array<any> = [
  {
    playListName:'Deneme',
    playListContent:[
      this.allSoundList[0],
      this.allSoundList[1],
      this.allSoundList[2],
      this.allSoundList[3],
      this.allSoundList[4],
      this.allSoundList[5]
    ],
  }]

  constructor() { }
  public musicInput(): Observable<any[]>{
    return this.dataSubject.asObservable();
  }
  updateData(newData: any[]): void {
    this.allSoundList = newData; // Yeni veriyi güncelle
    this.dataSubject.next(this.allSoundList); // Yeni veriyi bileşenlere yay
  }
  public getAllMusic():Observable<any[]>{
   return of(this.allSoundList);
  }
  public musicPlayerSender(music:any){
    this.list.next(music);
  }
}

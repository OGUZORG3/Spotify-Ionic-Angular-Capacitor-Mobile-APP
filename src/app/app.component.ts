import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { IonContent } from '@ionic/angular/standalone';
import { Directory, Filesystem } from '@capacitor/filesystem';
import { App } from '@capacitor/app';
import { AndroidSettings, NativeSettings } from 'capacitor-native-settings';
import { music } from './service/interfaces';
import { MusicDataService } from './service/music-data.service';
import { SplashScreen } from '@capacitor/splash-screen';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet,IonContent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit{
  public supportedFormat = ['.mp3', '.wav', '.flac', '.aac', '.mp4', '.avi', '.wma', '.ogg','.aiff','.m4a'];
  public musicFiles:Array<music> = [];
  title = 'SpotifyClone';
  constructor(private musicService : MusicDataService){

  }
  ngOnInit(): void {

    this.initializeApp();
  }

  async initializeApp() {
    try {
      const hasPermission = await this.checkPermissions();

      if (!hasPermission) {
        console.error('Public storage permission was not granted.');
        return;
      }

      const a = await Filesystem.checkPermissions();

      if (a.publicStorage === 'granted') {
        await this.findMusicFilesInDirectory('/');
        this.musicService.updateData(this.musicFiles);
        SplashScreen.hide({ fadeOutDuration: 1000 });
      }

      console.log('Uygulama başarıyla yüklendi.');
    } catch (error) {
      console.error('Uygulama yüklenirken bir hata oluştu:', error);
    }
  }

async checkPermissions(): Promise<boolean> {
  const permStatus = await Filesystem.checkPermissions();

  if (permStatus.publicStorage === 'granted') {
    return true;
  }

  const perm = await Filesystem.requestPermissions();

  if (perm.publicStorage === 'granted') {
    return true;
  }

  try {
    await NativeSettings.openAndroid({ option:AndroidSettings.ApplicationDetails });
    const settingPerm = await Filesystem.checkPermissions();

    if (settingPerm.publicStorage === 'granted') {
      return true;
    }
    else{
      App.exitApp();
    }
  } catch (error) {
    console.error('Error opening Android settings:', error);
  }

  return false;
}
  // async checkPermissions(): Promise<void> {
  //   return await new Promise((resolve, reject) => {
  //       Filesystem.checkPermissions().then((permStatus) => {
  //       if (permStatus.publicStorage === 'granted') {
  //         resolve();
  //       } else {
  //         Filesystem.requestPermissions().then((perm) => {
  //             console.log('sadasd')
  //             if(perm.publicStorage !== 'granted')
  //             {
  //           NativeSettings.openAndroid({ option: AndroidSettings.ApplicationDetails }).then(() => {
  //               Filesystem.checkPermissions().then((settingPerm) => {
  //                 if (settingPerm.publicStorage !== 'granted') {
  //                   reject('İzin reddedildi ve ayarlara gidildi, hala izin verilmedi.');
  //                   App.exitApp();
  //                 } else {
  //                   resolve();
  //                 }
  //               });
  //             }).catch(() => {
  //               reject('Ayarlara gitmede bir hata oluştu.');
  //             });}

  //         });
  //       }
  //     })
  //   });
  // }
  async findMusicFilesInDirectory(directoryPath: string) {
    try {
      const result = await Filesystem.readdir({
        path: directoryPath,
        directory: Directory.ExternalStorage // Telefonun harici depolama alanı
      });
      let i=0;
      for (const file of result.files) {
        const fullPath = `${file.uri}`;

        i+=1;
        if (this.supportFileFormat(file.name)) {
          this.musicFiles.push({id:i,picture:'', title: file.name, soundPath: fullPath,muzikSanatci:file.name });
        } else {
          let pathString = (fullPath.substring(fullPath.indexOf('0/')+1,fullPath.length ));
          if ((await Filesystem.stat({ path: fullPath })).type === 'directory') {
            await this.findMusicFilesInDirectory(pathString);
          }
        }
      }
    } catch (error) {
      console.error('Error listing directories:', error);
    }
  }
  supportFileFormat(fileName:string){
    const fileExtention = fileName.substring(fileName.lastIndexOf('.'));
    console.log(fileExtention);
    return this.supportedFormat.includes(fileExtention);
  }
  readMetaData(){
  }
}

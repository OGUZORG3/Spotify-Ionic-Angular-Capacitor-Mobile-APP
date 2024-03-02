import { music } from './../../service/interfaces';
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Filesystem, Directory} from '@capacitor/filesystem';
import { MusicDataService } from 'src/app/service/music-data.service';
@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone:true,
  imports:[CommonModule],
})
export class SettingsComponent  implements OnInit {
  constructor() { }
  ngOnInit() {
    let i;
  }
}

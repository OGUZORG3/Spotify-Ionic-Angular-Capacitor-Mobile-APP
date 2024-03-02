import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SearchBarService } from '../../service/search-bar.service';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-top-nav',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './top-nav.component.html',
  styleUrl: './top-nav.component.css'
})
export class TopNavComponent implements OnInit {
  @Output() sidebarVisible = new EventEmitter<boolean>();
  public isSideBarVisible:boolean=false;
  public isSearchFiledVisible: boolean =false;
  constructor(private sb:SearchBarService){

  }
  ngOnInit(): void {
    this.sb.isSearchVisible.subscribe(status => {
      this.isSearchFiledVisible = status;
      console.log(this.isSearchFiledVisible);
    })
  }
  public sideBarController(){
    if(window.innerWidth < 972){
      if(this.isSideBarVisible == true){
        this.isSideBarVisible=false;
        this.sidebarVisible.emit(this.isSideBarVisible);
      }
      else if (this.isSideBarVisible == false){
        this.isSideBarVisible=true;
        this.sidebarVisible.emit(this.isSideBarVisible);
      }
    }
  }
}

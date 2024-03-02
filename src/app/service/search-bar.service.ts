import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SearchBarService {
  public keywords:string = '';
  public isSearchVisible: BehaviorSubject<boolean> = new BehaviorSubject(false)
  constructor() { }
}

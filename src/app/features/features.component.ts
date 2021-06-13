import {Component, OnDestroy, OnInit} from '@angular/core';
import { NavItem } from './ui/model/nav-item';
import { MediaChange, MediaObserver } from "@angular/flex-layout";
import {Observable, Subscription} from 'rxjs';
import { menu } from './ui/model/menu';
import {filter, map} from "rxjs/operators";
@Component({
  selector: 'app-features',
  templateUrl: './features.component.html',
  styleUrls: ['./features.component.css']
})
export class FeaturesComponent implements OnDestroy {

  public opened: boolean = true;
  public mediaWatcher!: Subscription;
  public menu: NavItem[] = menu;

  constructor(private media: MediaObserver) {
    this.mediaWatcher = this.media.media$.subscribe((mediaChange: MediaChange) => {
      this.handleMediaChange(mediaChange);
    })
  }

  ngOnDestroy() {
    this.mediaWatcher.unsubscribe();
  }

  private handleMediaChange(mediaChange: MediaChange) {
    if (this.media.isActive('lt-md')) {
      this.opened = false;
    } else {
      this.opened = true;
    }
  }



}

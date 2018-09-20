import {
  Component, OnChanges, HostListener
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnChanges {

  constructor(
    private _router: Router
  ) { }

  ngOnChanges() {
    this.getRoute();
  }

  getRoute() {
    if (this._router.url !== '/home' ) {
      return true
    }
    return false;
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number > 0) {
      this.showIsologo = false;
    } else {
      this.showIsologo = true;
    }
  }

}

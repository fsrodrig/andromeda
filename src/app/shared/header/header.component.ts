import {
  Component, OnChanges, HostListener
} from '@angular/core';
import {
  EasingLogic
} from 'ngx-page-scroll';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnChanges {

  myEasing: EasingLogic;
  showIsologo = true;

  constructor(
    private _router: Router
  ) {

    this.myEasing = {
      ease: (t: number, b: number, c: number, d: number): number => {
        // easeInOutExpo easing
        if (t === 0) return b;
        if (t === d) return b + c;
        if ((t /= d / 2) < 1) return c / 2 * Math.pow(2, 10 * (t - 1)) + b;
        return c / 2 * (-Math.pow(2, -10 * --t) + 2) + b;
      }
    };

  }

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

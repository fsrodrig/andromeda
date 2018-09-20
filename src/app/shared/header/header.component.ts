import {
  Component, OnChanges
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

}

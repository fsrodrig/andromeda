import {
  Component, OnChanges, HostListener
} from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnChanges {

  showIsologo = true;

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

  goTo(seccion: string) {
    this._router.navigate(['/home']);
  }

  @HostListener("window:scroll", [])
  onWindowScroll() {
    const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
    if (number === 0 && !this.getRoute()) {
      this.showIsologo = true;
    } else {
      this.showIsologo = false;
    }
  }

}

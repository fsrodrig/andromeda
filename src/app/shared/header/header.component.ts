import { Component, OnChanges } from '@angular/core';
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
    if (!this._router.url.includes('/home') ) {
      return true
    }
    return false;
  }

  goTo(seccion: string) {
    this._router.navigate(['/home'], {fragment: seccion});
  }
}

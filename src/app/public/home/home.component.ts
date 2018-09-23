import { Component, HostListener } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  showSocialBar = true;

  constructor() {
    init_plugins();
   }

   @HostListener("window:scroll", [])
   onWindowScroll() {
     const number = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0;
     if (number > 0) {
       this.showSocialBar = false;
     } else {
       this.showSocialBar = true;
     }
   }

}

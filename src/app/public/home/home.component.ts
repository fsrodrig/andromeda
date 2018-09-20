import { Component } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent {

  constructor() {
    init_plugins();
   }

}

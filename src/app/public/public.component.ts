import { Component } from '@angular/core';

declare function init_plugins();

@Component({
    selector: 'app-public',
    templateUrl: './public.component.html'
})
export class PublicComponent {

    constructor() {
        init_plugins();
     }

}

import { Component, OnInit } from '@angular/core';

declare function init_plugins();

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  constructor() {
    // init_plugins();
   }

  ngOnInit() {
  }

}

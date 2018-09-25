import { Component, OnInit } from '@angular/core';
import { PostService } from '../../backoffice/posts/post.service';
import { Observable } from 'rxjs';
import { Post } from '../../backoffice/posts/post.model';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.css']
})
export class BlogComponent implements OnInit {

  posts: Observable<Post[]>
  
  constructor(
    private _posts: PostService
  ) {}

  ngOnInit( ) {
    window.scrollTo(0,0);
    this.posts = this._posts.getActive();
  }

}

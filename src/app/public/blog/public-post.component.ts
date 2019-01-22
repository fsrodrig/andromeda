import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../backoffice/posts/post.service';
import { Post } from '../../backoffice/posts/post.model';

@Component({
  selector: 'app-public-post',
  templateUrl: './public-post.component.html',
})
export class PublicPostComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private _post: PostService
  ) { }

  ngOnInit() {
    this.route.params.subscribe(
      (param) => this._post.find(param.id).subscribe( (p) =>  this.post =  p )
    );
  }

  goBack() {
    window.history.back();
  }

}

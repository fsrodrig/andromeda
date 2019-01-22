import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PostService } from '../../backoffice/posts/post.service';
import { Post } from '../../backoffice/posts/post.model';
import { SeoService } from 'src/app/core/seo.service';

@Component({
  selector: 'app-public-post',
  templateUrl: './public-post.component.html',
})
export class PublicPostComponent implements OnInit {

  post: Post;

  constructor(
    private route: ActivatedRoute,
    private _post: PostService,
    private state: TransferState,
    private _seo: SeoService
  ) { }

  ngOnInit() {
    // If state is available, start with it your observable
    const exists = this.state.get(DATA, {} as any);
    this.route.params.subscribe( (param) => this._post.find(param.id).subscribe( (p) => this.onSuccess(p) ));

  }

  private onSuccess(p: Post) {
    this.post =  p;
    this.state.set(DATA, this.post);
    this._seo.generateTags({
      title: this.post.titulo,
      description: this.post.resumen,
      image: this.post.foto
    });
  }

  goBack() {
    window.history.back();
  }

}

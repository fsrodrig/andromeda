import { Component, OnInit } from '@angular/core';
import { Post } from './post.model';
import { PostService } from './post.service';
import { Observable } from 'rxjs';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html'
})
export class PostComponent implements OnInit {

  posts: Observable<Post[]>;

  constructor(
    private _post: PostService,
    private _router: Router
  ) { }

  ngOnInit() {

    this.posts = this._post.get();
  }

  public create() {
		this._router.navigate(['back-office/posts', 'new']);
	}

	public edit(post: Post) {
    console.log('post :', post.id);
		this._router.navigate(['back-office/posts', 'edit', post.id]);
	}

  delete( post: Post, index: number) {
    swal({
			title: `Dar de baja/Eliminar Post`,
			text: 'Seleccione una opción',
			icon: 'warning',
			dangerMode: true,
			buttons: {
				cancel: {
					text: "Cancelar",
					value: 'cancel',
					visible: true,
					className: "",
					closeModal: true,
				},
				baja: {
					text: "Dar de baja",
					value: 'baja',
					visible: true,
					className: "",
					closeModal: true,
				},
				eliminar: {
					text: "Eliminar",
					value: 'eliminar',
					visible: true,
					className: "",
					closeModal: true
				}
			}
		})
			.then((value) => {
				if (value === 'baja') {
					post.estado = false;
          this._post.update(post)
                      .then(
						            () => {
						            	swal({ title: `Post dado de baja con éxito`, icon: 'success' });
						            	this.restoreValues();
						            })
                      .catch((err) =>  console.log('reventó el delete', err))
				}
				if (value === 'eliminar') {
          this._post.delete(post)
                      .then(
						            () => {
						            	swal({ title: `Post eliminado con éxito`, icon: 'success' });
						            	this.restoreValues();
                        })
                      .catch((err) => console.log('reventó el delete', err))
				}
			});
  }

  private restoreValues() {
    this.posts = this._post.get();
  }

}

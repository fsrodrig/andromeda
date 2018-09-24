import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common';
import { PostService } from './post.service';
import { Post } from './post.model';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-post-view',
  templateUrl: './post-view.component.html',
  styles: []
})
export class PostViewComponent implements OnInit {

  form: FormGroup;

  portada='posts/portadas';
  contenido = 'posts/contenido'
  
  isSaving = false;
  isCargada = false;

  postId: string;

  config = {  
    height: '300px',
    toolbar: [
	    // [groupName, [list of button]]
	    ['misc', ['fullscreen','codeview', 'undo', 'redo']],
	    // ['style', ['bold', 'italic', 'underline']],
	    ['font', ['bold', 'italic', 'underline', 'strikethrough', 'superscript', 'subscript', 'clear']],
	    ['fontsize', ['fontname', 'fontsize', 'color']],
	    ['para', ['style0', 'ul', 'ol', 'paragraph', 'height']],
      ['insert', ['table', 'picture', 'link', 'video', 'hr']]
    ],
    disableDragAndDrop: true
  };

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  constructor(
    private sanitizer: DomSanitizer,
    private datePipe: DatePipe,
    private _post: PostService,
    private route: ActivatedRoute,

  ) {
    this.form = new FormGroup({
      titulo: new FormControl(null, Validators.required),
      autor: new FormControl(null, Validators.required),
      fecha: new FormControl(this.datePipe.transform(Date.now(), 'yyyy-MM-dd'), Validators.required),
      foto: new FormControl(null),
      html: new FormControl(null, Validators.required),
      estado: new FormControl(true, Validators.required),
      resumen: new FormControl(null, Validators.required)
    });
  }

  ngOnInit() {
    this.route.params.subscribe( (params) => {
      this._post.find(params.id).subscribe(
        (post: Post)=>{
         this.postId = post.id
         this.form.controls.titulo.setValue(post.titulo);
         this.form.controls.autor.setValue(post.autor);
         this.form.controls.fecha.setValue(this.datePipe.transform(post.fecha, 'yyyy-MM-dd'));
         this.form.controls.foto.setValue(post.foto);
         this.form.controls.html.setValue(post.contenido);
         this.form.controls.estado.setValue(post.estado);
         this.form.controls.resumen.setValue(post.resumen);
        }
      )
    })
  }

  save() {
    if (this.form.valid) {
      let fecha = new Date(this.form.value.fecha);
      fecha.setDate(fecha.getDate() +1); // Si no hago esto me devuelve un dia menos

      this.isSaving = true;
      const post: Post = {
        id: this.postId,
        titulo: this.form.value.titulo,
        autor:this.form.value.autor,
        fecha: fecha,
        foto:this.form.value.foto,
        contenido: this.form.value.html,
        estado: this.form.value.estado,
        resumen: this.form.value.resumen
      }

      this._post.update(post)
                  .then(
                    () => {
                      swal('Felicitaciones!', 'Post guardado con éxito', 'success')
                        .then(() => {
                          this.goBack();
                        });
                    })
                  .catch(
                    (err) => {
                      this.isSaving = false;
                      swal('Error!', err, 'error');
                    }
                  )
    }
  }

  goBack() {
    window.history.back();
  }

  onUpload(archivoUrl: Observable<string>) {
    this.form.controls.foto.setValue(archivoUrl);
    this.isCargada = true;
  }

}

import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { DatePipe } from '@angular/common';
import { Post } from './post.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html'
})
export class PostNewComponent {

  form: FormGroup;

  portada='posts/portadas';
  contenido = 'posts/contenido'
  
  isSaving = false;
  isCargada = false;

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
    public datePipe: DatePipe,
    private _post: PostService,
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

  save() {
    if (this.form.valid) {
      let fecha = new Date(this.form.value.fecha);
      fecha.setDate(fecha.getDate() +1); // Si no hago esto me devuelve un dia menos

      this.isSaving = true;
      const post: Post = {
        titulo: this.form.value.titulo,
        autor:this.form.value.autor,
        fecha: fecha,
        foto:this.form.value.foto,
        contenido: this.form.value.html,
        estado: this.form.value.estado,
        resumen: this.form.value.resumen
      }

      this._post.add(post)
                  .then(
                    () => {
                      swal('Felicitaciones!', 'Post creado con éxito', 'success')
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

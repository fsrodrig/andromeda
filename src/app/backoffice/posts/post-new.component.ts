import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { DatePipe } from '@angular/common';
import { Post } from './post.model';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html'
})
export class PostNewComponent {

  form: FormGroup;

  portada='posts/portadas';
  contenido = 'posts/contenido'
  
  isSaving = false;

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
  };

  editorDisabled = false;

  get sanitizedHtml() {
    return this.sanitizer.bypassSecurityTrustHtml(this.form.get('html').value);
  }

  constructor(
    private sanitizer: DomSanitizer,
    public datePipe: DatePipe,
    private _post: PostService
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
      this.isSaving = true;
      const post: Post = {
        titulo: this.form.value.titulo,
        autor:this.form.value.autor,
        fecha:this.form.value.fecha,
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

  onUpload(archivoUrl: string) {
    this.form.controls.foto.setValue(archivoUrl);
  }

}

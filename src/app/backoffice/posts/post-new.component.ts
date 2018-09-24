import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { PostService } from './post.service';
import { DatePipe } from '@angular/common';
import { Post } from './post.model';
import { Observable } from 'rxjs';
import { FileItem } from '../../components/img-storage/file-item.model';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
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
    private _post: PostService,
    private storage: AngularFireStorage
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
        fecha: new Date(this.form.value.fecha),
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
  }

  // Carga de imagenes

  estaSobreDropZone = false;
  permiteCargar = true;
  isCargada = false;
  uploadPercent: Observable<number>;
  downloadURL: Observable<string>;
  archivos: FileItem[] = [];
  private CARPETA_IMAGENES = 'img/posts';


  cargarImagenesFirebase() {
    this.permiteCargar = false;
    for (let archivo of this.archivos) {

      archivo.estaSubiendo = true;
      
      let path = `${ this.CARPETA_IMAGENES }/${ archivo.nombreArchivo }`;

      let fileRef = this.storage.ref(path);
      let uploadTask: AngularFireUploadTask  = this.storage.upload(path, archivo.archivo);

      uploadTask.percentageChanges().subscribe((num) => archivo.progreso = num);

      uploadTask.snapshotChanges().pipe(
              finalize(
                  () => { 
                    archivo.url = fileRef.getDownloadURL();
                    fileRef.getDownloadURL().subscribe( (v) => {
                      this.form.controls.foto.setValue(v);
                      this.isCargada =true;
                    });
                  }
              )
          ).subscribe()
      }
  }

  archivoSobreDropZone(e: boolean) {
    this.estaSobreDropZone = e;
  }

  limpiarArchivos() {
    this.isCargada = false;
    this.archivos = [];
    this.permiteCargar = true;
}


}

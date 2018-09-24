import {Injectable} from '@angular/core';
import {FileItem} from './file-item.model';
import { AngularFirestore } from '@angular/fire/firestore'
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable()
export class ImgUploadService {

    private CARPETA_IMAGENES = 'img';

    constructor(
        private db: AngularFirestore,
        private storage: AngularFireStorage
    ) {
    }

    listaUltimasImagenes(numeroImagenes: number) // : FirebaseListObservable<any[]> 
    {

        // return this.af.list(`/${ this.CARPETA_IMAGENES}`, {
        //     query: {
        //         limitToLast: numeroImagenes
        //     }
        // })

    }

    cargar_imagenes_firebase(archivos: FileItem[], llamadoPor: string) : Observable<string> 
    {

        let url: Observable<string>


            for (let archivo of archivos) {

                archivo.estaSubiendo = true;
                
                let path = `${ this.CARPETA_IMAGENES }/${ llamadoPor }/${ archivo.nombreArchivo }`;

                let fileRef = this.storage.ref(path);
                let uploadTask: AngularFireUploadTask  = this.storage.upload(path, archivo.archivo);

                uploadTask.percentageChanges().subscribe((num) => archivo.progreso = num);

                uploadTask.snapshotChanges().pipe(
                        finalize(
                            () => ( archivo.url = fileRef.getDownloadURL()) 
                        )
                    ).subscribe()
                return archivo.url;                
            }
    }
   /* eliminar_imagenes_firebase(, llamadoPor: string) {
        this.deleteFileData(upload.$key)
            .then( () => {
                this.deleteFileStorage(upload.name)
            })
            .catch((error) => console.log(error))
    }

    // Deletes the file details from the realtime db
    private deleteFileData(key: string, llamadoPor: string) {
        return this.af.list(`${this.CARPETA_IMAGENES}/${ llamadoPor }`).remove(key);
    }

    // Firebase files must have unique names in their respective storage dir
    // So the name serves as a unique key
    private deleteFileStorage(name: string, llamadoPor: string) {
        let storageRef = firebase.storage().ref();
        storageRef.child(`${ this.CARPETA_IMAGENES }/${ llamadoPor }/${name}`).delete()
    }*/
}

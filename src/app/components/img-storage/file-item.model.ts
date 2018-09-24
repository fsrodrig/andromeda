import { Observable } from "rxjs";

export class FileItem {

  public archivo: File;
  public nombreArchivo: string;
  public url: Observable<string>;
  public estaSubiendo = true;
  public progreso = 0;

  constructor( archivo: File ) {
    this.archivo = archivo;
    this.nombreArchivo = archivo.name;
  }

}

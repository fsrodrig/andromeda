import {
    Directive, EventEmitter, ElementRef,
    HostListener, Input, Output
} from '@angular/core';

import {FileItem} from './file-item.model';

@Directive({
    selector: '[dropFiles]'
})
export class DropFilesDirective {

    @Input() archivos: FileItem[] = [];
    @Output() archivoSobre: EventEmitter<any> = new EventEmitter();

    constructor(public elemento: ElementRef) {
    }

    @HostListener('dragenter', ['$event'])
    public onDragEnter(event: any) {
        this.archivoSobre.emit(true);
    }

    @HostListener('dragleave', ['$event'])
    public onDragLeave(event: any) {
        this.archivoSobre.emit(false);
    }

    @HostListener('dragover', ['$event'])
    public onDragover(event: any) {

        let transferencia = this._getTransferencia(event);
        transferencia.dropEffect = 'copy';

        this._prevenirYdetener(event);

        this.archivoSobre.emit(true);
    }

    @HostListener('drop', ['$event'])
    public onDrop(event: any) {

        let transferencia = this._getTransferencia(event);

        if (!transferencia) {
            return;
        }

        this._agregarArchivos(transferencia.files);
        this.archivoSobre.emit(false);

        this._prevenirYdetener(event);
    }

    private _getTransferencia(event: any) {
        return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
    }

    private _agregarArchivos(archivosLista: FileList) {

        // noinspection TsLint
        for (let propiedad in Object.getOwnPropertyNames(archivosLista)) {

            let archTemporal = archivosLista[propiedad];

            if (this._archivoPuedeSerCargado(archTemporal)) {

                let nuevoArchivo = new FileItem(archTemporal);
                this.archivos.push(nuevoArchivo);

            }

        }

    }

    private _prevenirYdetener(event: any) {
        event.preventDefault();
        event.stopPropagation();
    }

    private _archivoPuedeSerCargado(archivo: File) {

        if (!this._archivoYaFueDroppeado(archivo.name) && this._esImagen(archivo.type)) {
            return true
        }

        return false;

    }

    private _archivoYaFueDroppeado(nombreArchivo: string): boolean {

        // noinspection TsLint
        for (let i in this.archivos) {

            let arch = this.archivos[i];

            if (arch.archivo.name === nombreArchivo) {
                console.log('Archivo ya existe en la lista', nombreArchivo);
                return true;
            }
        }
        return false;
    }

    private _esImagen(tipoArchivo: string): boolean {

        return ( tipoArchivo === '' || tipoArchivo === undefined ) ? false : tipoArchivo.startsWith('image');

    }

}

export interface Post {
        id?: string,
        titulo: string,
        autor: string,
        fecha: Date,
        foto?: string,
        contenido: string,
        estado: boolean, // true = activo
        resumen: string
}

// export interface Author {
//         id?: string,
//         nombre: string,
//         apellido: string,
//         estado: boolean // true = activo
// }
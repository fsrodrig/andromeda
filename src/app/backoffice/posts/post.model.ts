export interface Post {
        id?: string,
        titulo: string,
        autor: string,
        fecha: Date,
        foto?: string,
        contenido: string,
        estado: boolean // true = activo
}

// export interface Author {
//         id?: string,
//         nombre: string,
//         apellido: string,
//         estado: boolean // true = activo
// }
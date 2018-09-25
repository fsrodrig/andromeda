import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post } from './post.model';
import { map } from 'rxjs/operators';

@Injectable()
export class PostService {

  postsCol: AngularFirestoreCollection<Post>;


  constructor(
    private afs: AngularFirestore
  ) {
    this.postsCol = this.afs.collection('posts', ref => ref.orderBy('fecha'));
   }

  find(id: string): Observable<Post> {
    return this.afs.doc<Post>('posts/' + id).snapshotChanges().pipe(
      map(a => {
        const data = a.payload.data() as Post;
        const id = a.payload.id;
        const fecha = a.payload.get('fecha').toDate()
        return { id, ...data, fecha };
      }))
  }

  get(): Observable<Post[]> {
    return this.postsCol.snapshotChanges().pipe(
        map(actions => actions.map(a => {
          const data = a.payload.doc.data() as Post;
          const id = a.payload.doc.id;
          const fecha = a.payload.doc.get('fecha').toDate()
          return { id, ...data, fecha };
        }))
      );
  }

  getActive(): Observable<Post[]> {
    let postsCol: AngularFirestoreCollection<Post>;
    postsCol = this.afs.collection('posts', ref => ref.where('estado', "==", true)
                                                      .orderBy('fecha'));
    return postsCol.snapshotChanges().pipe(
      map(actions => actions.map(a => {
        const data = a.payload.doc.data() as Post;
        const id = a.payload.doc.id;
        const fecha = a.payload.doc.get('fecha').toDate()
        return { ...data, fecha, id };
      }))
    );

  }

  add(post: Post) {
    return this.postsCol.add(post);
  }

  update(post: Post) {
    let postDoc = this.afs.doc<Post> ('posts/' + post.id);
    return postDoc.update(post);
  }

  changeStatus(post: Post) {
    let postDoc = this.afs.doc<Post> ('posts/' + post.id);
    post.estado = !post.estado;
    return postDoc.update(post);
  }

  delete(post: Post) {
    let postDoc = this.afs.doc<Post> ('posts/' + post.id);
    return postDoc.delete();
  }


}

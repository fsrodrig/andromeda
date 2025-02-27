import {
  Injectable
} from '@angular/core';
import {
  Router
} from '@angular/router';

import {
  auth
} from 'firebase/app';
import {
  AngularFireAuth
} from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore'

import {
  Observable,
  of
} from 'rxjs';
import {
  switchMap
} from 'rxjs/operators';
import {
  User
} from './user.interface'

@Injectable()
export class AuthService {

  user: Observable < User >;

  constructor(
    private afAuth: AngularFireAuth,
    private afs: AngularFirestore,
    private router: Router
  ) {

    //// Get auth data, then get firestore user document || null
    this.user = this.afAuth.authState.pipe(
      switchMap(user => {
        if (user) {
          return this.afs.doc < User > (`users/${user.uid}`).valueChanges()
        } else {
          return of(null)
        }
      })
    )


  }

  emailLogin(email, password) {
    return this.afAuth.auth.signInWithEmailAndPassword(email, password)
      .then((credential) => {
        this.updateUserData(credential.user);
      })
  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument < any > = this.afs.doc(`users/${user.uid}`);

    const data: User = {
      uid: user.uid,
      email: user.email
    }

    return userRef.set(data, {
      merge: true
    })

  }

  signOut() {
    this.afAuth.auth.signOut().then(() => {
      this.router.navigate(['/login']);
    });
  }
}

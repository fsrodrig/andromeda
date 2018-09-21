import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { User } from '../core/user.interface';
import { AuthService } from '../core/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  user: User
  error: string = null;

  constructor(
    private _auth: AuthService,
    private _router: Router
  ) { }

  ngOnInit() {
  }

  ingresar( forma: NgForm ) {
    
    if (forma.invalid) {
      return;
    }

    this.error = null;
    this._auth.emailLogin(forma.value.email, forma.value.password)
                .then( () => {
                  this._router.navigate(['/back-office']);
                })
                .catch( (res) => {
                  if (res.code === "auth/wrong-password") {
                    this.error = "Contraseña incorrecta"
                  } else if (res.code === "auth/invalid-email") {
                    this.error = "Usuario o contraseña incorrecta"
                  } else {
                    console.log('error :', res);
                  }
                })
  }

}

import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';
import { UserRegister } from 'src/app/model/UserRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

  register(userRegister:UserRegister): Observable<void>{
    return new Observable<void>(observer => {
      setTimeout(() => {
        if (userRegister.email == "error@email.com") {
          observer.error({message: "email already registered"});
        } else {
          observer.next();
        }
        observer.complete();
      }, 3000)
      })
  }

  recoverEmailPassword(email: string): Observable<void> {
    return new Observable<void>(observer => {
      this.auth.sendPasswordResetEmail(email).then(() => {
        observer.next();
        observer.complete();
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }

  login(email: string, password: string): Observable<User> {
    return new Observable<User>(observer => {
      this.auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
        if (userCredential.user) {
          this.router.navigate(['/homepage']); // Navigasi setelah login
          observer.next({ email: userCredential.user.email || '', id: userCredential.user.uid });
          observer.complete();
        } else {
          observer.error({ message: 'Login failed' });
        }
      }).catch(error => {
        observer.error(error);
        observer.complete();
      });
    });
  }
}

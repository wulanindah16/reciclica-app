import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user/User';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private auth: AngularFireAuth, private router: Router) { }

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

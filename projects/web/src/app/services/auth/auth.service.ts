import { Injectable } from '@angular/core';
import {
  Auth,
  signInWithRedirect,
  GoogleAuthProvider,
  signOut as firebaseSignOut,
  authState,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private afAuth: Auth, private router: Router) {}

  async signInWithGoogle() {
    const provider = new GoogleAuthProvider();
    await signInWithRedirect(this.afAuth, provider);
    const uid = this.afAuth.currentUser?.uid;
    if (!uid) {
      window.alert('ログインに失敗しました。');
    }
    this.router.navigate(['users', uid]);
  }

  async signOut() {
    await firebaseSignOut(this.afAuth);
    this.router.navigate(['/']);
  }

  isSignIn() {
    return this.afAuth.currentUser !== null;
  }

  fetchAuthState$() {
    return authState(this.afAuth);
  }
}

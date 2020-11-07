import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { handleHttpResponseError } from 'src/app/utils/handleHttpResponseError';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  user: firebase.User;

  constructor(private angularFireAuth: AngularFireAuth) {
    try {
      angularFireAuth.authState.subscribe((user) => {
        this.user = user;
      });
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  createUser(email: string, password: string) {
    try {
      return this.angularFireAuth.createUserWithEmailAndPassword(
        email,
        password
      );
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  login(email: string, password: string) {
    try {
      return this.angularFireAuth.signInWithEmailAndPassword(email, password);
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  logout() {
    try {
      return this.angularFireAuth.signOut();
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  hasUser() {
    try {
      return this.angularFireAuth.authState;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }

  getUser() {
    try {
      return this.user;
    } catch (err) {
      handleHttpResponseError(err);
    }
  }
}

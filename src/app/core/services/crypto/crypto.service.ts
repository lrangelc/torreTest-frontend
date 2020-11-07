import { Injectable } from '@angular/core';
import { AES, enc } from 'crypto-ts';
import { environment } from './../../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class CryptoService {
  constructor() {}

  public encrypt(value: string): string {
    return environment.production
      ? AES.encrypt(value, environment.cryptoKey).toString()
      : value;
  }

  public decrypt(value: string): string {
    return environment.production
      ? AES.decrypt(value, environment.cryptoKey).toString(enc.Utf8)
      : value;
  }
}

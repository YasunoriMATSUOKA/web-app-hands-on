import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Account, NetworkType } from 'symbol-sdk';

@Component({
  selector: 'app-page-create',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>New Account</h2>
    <p>Private key: {{ privateKey }}</p>
    <p>Public key: {{ publicKey }}</p>
    <p>Address: {{ address }}</p>
  `,
  styles: [],
})
export class CreateComponent {
  privateKey: string;
  publicKey: string;
  address: string;

  constructor() {
    const account = Account.generateNewAccount(NetworkType.TEST_NET);
    this.privateKey = account.privateKey;
    this.publicKey = account.publicKey;
    this.address = account.address.plain();
  }
}

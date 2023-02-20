import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { RepositoryFactoryHttp, Address } from 'symbol-sdk';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-page-account',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h2>Account Info</h2>
    <ng-container *ngIf="xymAbsoluteAmount$ | async as xymAbsoluteAmount">
      <p>XYM absolute amount: {{ xymAbsoluteAmount }} [μXYM]</p>
    </ng-container>
  `,
  styles: [],
})
export class AccountComponent {
  address$: Observable<string | null>;
  xymAbsoluteAmount$: Observable<string>;

  constructor(private route: ActivatedRoute) {
    this.address$ = this.route.paramMap.pipe(map((paramMap) => paramMap.get('accountId')));
    this.xymAbsoluteAmount$ = this.address$.pipe(
      mergeMap((address) => {
        if (!address) {
          return '0';
        }
        const symbolAddress = Address.createFromRawAddress(address);
        const nodeUrl = 'https://sym-test-04.opening-line.jp:3001';
        const repositoryFactoryHttp = new RepositoryFactoryHttp(nodeUrl);
        const accountRepository = repositoryFactoryHttp.createAccountRepository();
        return accountRepository.getAccountInfo(symbolAddress).pipe(
          map((accountInfo) => {
            return accountInfo.mosaics.find((mosaic) => mosaic.id.toHex() === '72C0212E67A08BCE');
          }),
          map((mosaic) => {
            return mosaic ? mosaic.amount.toString() : '0';
          })
        );
      })
    );
  }
}

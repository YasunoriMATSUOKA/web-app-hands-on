import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from './user.model';
import { EXISTING_USER_NORMAL } from './user.mock';
import { UserInfrastructureServiceInterface } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfrastructureService implements UserInfrastructureServiceInterface {
  fetchUser$(id: string): Observable<User | null | undefined> {
    // Todo: Fetch user from Firestore
    if (id === 'null') {
      return of(null);
    }
    if (id === 'undefined') {
      return of(undefined);
    }
    return of(new User(EXISTING_USER_NORMAL));
  }
}

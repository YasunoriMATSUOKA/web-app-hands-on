import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { BaseUser, BaseUserUpdate, NewUser, User, UserUpdate } from './user.type';
import {
  assertIsBaseUser,
  assertIsBaseUserUpdate,
  assertIsNewUser,
  assertIsUser,
  assertIsUserUpdate,
} from '../../predicates/type.predicate';
import { UserInfrastructureServiceInterface } from './user.service';
import { UPDATED_USER_NORMAL, USER_NORMAL } from './user.mock';

@Injectable({
  providedIn: 'root',
})
export class UserInfrastructureService implements UserInfrastructureServiceInterface {
  async createUser(baseUser: BaseUser): Promise<User | undefined> {
    assertIsBaseUser(baseUser);
    const now = new Date();
    const newUser: NewUser = {
      ...baseUser,
      createdAt: now,
      updatedAt: now,
    };
    assertIsNewUser(newUser);
    // Todo: Create user in Firestore
    return USER_NORMAL;
  }

  fetchUser$(id: string): Observable<User | null | undefined> {
    // Todo: Fetch user from Firestore
    if (id === 'null') {
      return of(null);
    }
    if (id === 'undefined') {
      return of(undefined);
    }
    const user = USER_NORMAL;
    assertIsUser(user);
    return of(user);
  }

  async fetchUser(id: string): Promise<User | undefined> {
    // Todo: Fetch user from Firestore
    if (id === 'undefined') {
      return undefined;
    }
    const user = USER_NORMAL;
    assertIsUser(user);
    return user;
  }

  async updateUser(baseUserUpdate: BaseUserUpdate): Promise<User | undefined> {
    assertIsBaseUserUpdate(baseUserUpdate);
    const now = new Date();
    const userUpdate: UserUpdate = {
      ...baseUserUpdate,
      updatedAt: now,
    };
    assertIsUserUpdate(userUpdate);
    // Todo: Update user in Firestore
    return UPDATED_USER_NORMAL;
  }

  async deleteUser(id: string): Promise<{ id: string } | undefined> {
    // Todo: Delete user from Firestore
    return;
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Auth } from '@angular/fire/auth';
import { addDoc, collection, doc, Firestore, getDoc, docData, updateDoc, deleteDoc } from '@angular/fire/firestore';
import { converter } from '../../utils/firebase';
import { BaseUser, BaseUserUpdate, NewUser, User, UserUpdate } from './user.type';
import {
  assertIsBaseUser,
  assertIsBaseUserUpdate,
  assertIsNewUser,
  assertIsUserUpdate,
} from '../../predicates/type.predicate';
import { UserInfrastructureServiceInterface } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class UserInfrastructureService implements UserInfrastructureServiceInterface {
  constructor(private afAuth: Auth, private db: Firestore) {}

  async createUser(baseUser: BaseUser): Promise<User | undefined> {
    assertIsBaseUser(baseUser);
    const now = new Date();
    const newUser: NewUser = {
      ...baseUser,
      createdAt: now,
      updatedAt: now,
    };
    assertIsNewUser(newUser);
    const docRef = await addDoc(collection(this.db, '/users').withConverter(converter<NewUser>()), newUser);
    const user = (await getDoc(docRef.withConverter(converter<User>()))).data();
    return user;
  }

  fetchUser$(id: string): Observable<User | null | undefined> {
    return docData(doc(this.db, `/users/${id}`).withConverter(converter<User>()));
  }

  async fetchUser(id: string): Promise<User | undefined> {
    return (await getDoc(doc(this.db, `/users/${id}`).withConverter(converter<User>()))).data();
  }

  async updateUser(baseUserUpdate: BaseUserUpdate): Promise<User | undefined> {
    assertIsBaseUserUpdate(baseUserUpdate);
    const now = new Date();
    const userUpdate: UserUpdate = {
      ...baseUserUpdate,
      updatedAt: now,
    };
    assertIsUserUpdate(userUpdate);
    await updateDoc(doc(this.db, `/users/${userUpdate.id}`).withConverter(converter<UserUpdate>()), userUpdate);
    return await this.fetchUser(userUpdate.id);
  }

  async deleteUser(id: string): Promise<{ id: string } | undefined> {
    try {
      await deleteDoc(doc(this.db, `/users/${id}`).withConverter(converter<User>()));
      return { id };
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }
}

import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { UserInfrastructureService } from './user-infrastructure.service';
import { User } from './user.model';

export interface UserInfrastructureServiceInterface {
  fetchUser$(id: string): Observable<User | null | undefined>;
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private userInfrastructureServiceInterface: UserInfrastructureServiceInterface;

  constructor(userInfrastructureService: UserInfrastructureService) {
    this.userInfrastructureServiceInterface = userInfrastructureService;
  }

  fetchUser$(id: string): Observable<User | null | undefined> {
    return this.userInfrastructureServiceInterface.fetchUser$(id);
  }
}

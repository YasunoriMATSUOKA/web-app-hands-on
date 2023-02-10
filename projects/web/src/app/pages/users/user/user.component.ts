import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../../services/user/user.service';
import { map, mergeMap, Observable, of, tap } from 'rxjs';
import { User } from '../../../services/user/user.model';
import { ActivatedRoute } from '@angular/router';
import { ViewUserComponent } from '../../../views/users/user/user.component';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [CommonModule, ViewUserComponent],
  providers: [UserService],
  template: ` <app-view-user [user]="user$ | async"></app-view-user> `,
  styles: [],
})
export class UserComponent {
  user$: Observable<User | null | undefined>;

  constructor(private route: ActivatedRoute, userService: UserService) {
    this.user$ = this.route.paramMap.pipe(
      map((params) => params.get('userId')),
      mergeMap((id) => {
        if (!id) {
          return of(undefined);
        }
        return userService.fetchUser$(id);
      })
    );
  }
}

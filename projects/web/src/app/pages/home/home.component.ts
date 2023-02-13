import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHomeComponent } from '../../views/home/home.component';
import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, ViewHomeComponent],
  providers: [AuthService],
  template: `
    <button (click)="clickSignIn()">SignIn</button>
    <button (click)="clickSignOut()">SignOut</button>
    <p>home works!</p>
    <app-view-home></app-view-home>
  `,
  styles: [],
})
export class HomeComponent {
  constructor(private authService: AuthService) {}

  async clickSignIn() {
    await this.authService.signInWithGoogle();
  }

  async clickSignOut() {
    await this.authService.signOut();
  }
}

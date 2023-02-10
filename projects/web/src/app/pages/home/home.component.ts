import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ViewHomeComponent } from '../../views/home/home.component';

@Component({
  selector: 'app-page-home',
  standalone: true,
  imports: [CommonModule, ViewHomeComponent],
  template: `
    <p>home works!</p>
    <app-view-home></app-view-home>
  `,
  styles: [],
})
export class HomeComponent {}

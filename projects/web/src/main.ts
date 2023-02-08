import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { AppComponent } from './app/app.component';
import { APP_ROUTES } from './routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(APP_ROUTES)],
});

import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should create the app', async () => {
    const { fixture } = await render(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render title', async () => {
    await render(HomeComponent);
    expect(screen.getAllByText('home is working!').length).toBe(1);
  });
});

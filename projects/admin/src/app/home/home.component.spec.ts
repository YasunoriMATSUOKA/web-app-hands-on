import { render, screen } from '@testing-library/angular';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  it('should create the app', async () => {
    const { fixture } = await render(HomeComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should render 'home works!'`, async () => {
    await render(HomeComponent);
    expect(screen.getAllByText('home works!').length).toBe(1);
  });
});

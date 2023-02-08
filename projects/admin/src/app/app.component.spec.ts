import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  it('should create the app', async () => {
    const { fixture } = await render(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'admin'`, async () => {
    const { fixture } = await render(AppComponent);
    const app = fixture.componentInstance;
    expect(app.title).toEqual('admin');
  });

  it('should render title', async () => {
    await render(AppComponent);
    expect(screen.getAllByText('admin app is running!').length).toBe(1);
  });
});

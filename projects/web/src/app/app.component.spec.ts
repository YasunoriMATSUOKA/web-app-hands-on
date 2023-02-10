import { render, screen } from '@testing-library/angular';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  let component: AppComponent;

  beforeEach(async () => {
    const { fixture } = await render(AppComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', async () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'web'`, async () => {
    expect(component.title).toEqual('web');
  });

  it('should render title', async () => {
    expect(screen.getAllByText('web app is running!')).toBeTruthy();
  });
});

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

  it(`should have as title 'admin'`, async () => {
    expect(component.title).toEqual('admin');
  });

  it('should render title', async () => {
    expect(screen.getByText('admin app is running!')).toBeTruthy();
  });
});

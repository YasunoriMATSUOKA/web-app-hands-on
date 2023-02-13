import { ComponentFixture } from '@angular/core/testing';
import { render, RenderResult, screen } from '@testing-library/angular';
import { USER_NORMAL } from '../../../services/user/user.mock';
import { User } from '../../../services/user/user.type';
import { ViewUserComponent } from './user.component';

describe('UserComponent', () => {
  let renderResult: RenderResult<ViewUserComponent, ViewUserComponent>;
  let fixture: ComponentFixture<ViewUserComponent>;
  let component: ViewUserComponent;

  beforeEach(async () => {
    renderResult = await render(ViewUserComponent);
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render loading... with "null"', () => {
    component.user = null;
    fixture.autoDetectChanges();
    expect(screen.getByText('loading...')).toBeTruthy();
  });

  it('should render not found with "undefined"', () => {
    component.user = undefined;
    fixture.autoDetectChanges();
    expect(screen.getByText('not found')).toBeTruthy();
  });

  it('should render user info with EXISTING_USER_NORMAL', () => {
    component.user = USER_NORMAL;
    fixture.autoDetectChanges();
    expect(screen.getByText('User')).toBeTruthy();
    expect(screen.getByText(`id: ${USER_NORMAL.id}`)).toBeTruthy();
    expect(screen.getByText(`name: ${USER_NORMAL.name}`)).toBeTruthy();
    expect(screen.getByText(`photoUrl: ${USER_NORMAL.photoUrl}`)).toBeTruthy();
    expect(screen.getByText(`bio: ${USER_NORMAL.bio}`)).toBeTruthy();
    expect(screen.getByText(`provider: ${USER_NORMAL.provider}`)).toBeTruthy();
    expect(screen.getByText(`google: ${USER_NORMAL.google}`)).toBeTruthy();
    expect(screen.getByText(`twitter: ${USER_NORMAL.twitter}`)).toBeTruthy();
    expect(screen.getByText(`github: ${USER_NORMAL.github}`)).toBeTruthy();
  });
});

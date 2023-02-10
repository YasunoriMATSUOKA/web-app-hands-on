import { ActivatedRoute, convertToParamMap, provideRouter } from '@angular/router';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { EXISTING_USER_NORMAL } from '../../../services/user/user.mock';
import { User } from '../../../services/user/user.model';
import { UserService } from '../../../services/user/user.service';
import { UserComponent } from './user.component';

describe('UserComponent', () => {
  let component: UserComponent;

  it('should create', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'userId' })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('user$ should be Observable null with userId="null"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'null' })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('user$ should be Observable null with userId="undefined"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'undefined' })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('user$ should be Observable EXISTING_USER with userId="testId"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'testId' })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toEqual(new User(EXISTING_USER_NORMAL));
    });
  });

  it('user$ should be Observable undefined with userId=null', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: null })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('user$ should be Observable undefined with userId=undefined', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [
        provideRouter([{ path: 'users/:userId', component: UserComponent }]),
        { provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: undefined })) } },
        { provide: UserService },
      ],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });
});

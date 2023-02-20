import { ActivatedRoute, convertToParamMap } from '@angular/router';
import { render } from '@testing-library/angular';
import { of } from 'rxjs';
import { USER_NORMAL } from '../../../services/user/user.mock';
import { User } from '../../../services/user/user.type';
import { UserComponent } from './user.component';

const renderPattern = [
  { case: 'userId = null', userId: null, user: null },
  { case: 'userId = undefined', userId: undefined, user: undefined },
  { case: 'userId = ""', userId: '', user: undefined },
  { case: 'userId = "testId"', userId: 'testId', user: USER_NORMAL },
];

const userComponentRenderHelper = async (userId: string | null | undefined) => {
  await render(UserComponent, {
    providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId })) } }],
  });
};

describe('UserComponent', () => {
  let component: UserComponent;

  it('should create', async () => {
    const { fixture } = await render(UserComponent);
    component = fixture.componentInstance;
    expect(component).toBeTruthy();
  });

  it('user$ should be Observable null with userId="null"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'null' })) } }],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('user$ should be Observable null with userId="undefined"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'undefined' })) } }],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('user$ should be Observable EXISTING_USER with userId="testId"', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: 'testId' })) } }],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toEqual(USER_NORMAL);
    });
  });

  it('user$ should be Observable undefined with userId=null', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: null })) } }],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('user$ should be Observable undefined with userId=undefined', async () => {
    const { fixture } = await render(UserComponent, {
      providers: [{ provide: ActivatedRoute, useValue: { paramMap: of(convertToParamMap({ userId: undefined })) } }],
    });
    component = fixture.componentInstance;
    component.user$.subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });
});

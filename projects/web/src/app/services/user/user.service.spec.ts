import { TestBed } from '@angular/core/testing';
import { UserInfrastructureService } from './user-infrastructure.service';
import { EXISTING_USER_NORMAL } from './user.mock';
import { User } from './user.model';

import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [{ provide: UserInfrastructureService }],
    });
    service = TestBed.inject(UserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('fetchUser$ should return Observable null with "null"', () => {
    service.fetchUser$('null').subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('fetchUser$ should return Observable undefined with "undefined"', () => {
    service.fetchUser$('undefined').subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('fetchUser$ should return Observable EXISTING_USER_NORMAL', () => {
    service.fetchUser$('testId').subscribe((user) => {
      expect(user).toEqual(new User(EXISTING_USER_NORMAL));
    });
  });

  it('fetchUser$ should call UserInfrastructureService fetchUser$', () => {
    const spy = spyOn(TestBed.inject(UserInfrastructureService), 'fetchUser$');
    service.fetchUser$('testId');
    expect(spy).toHaveBeenCalledOnceWith('testId');
  });
});

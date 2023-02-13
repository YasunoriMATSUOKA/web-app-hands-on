import { TestBed } from '@angular/core/testing';
import { UserInfrastructureService } from './user-infrastructure.service';
import { User } from './user.type';
import { USER_NORMAL } from './user.mock';

describe('UserInfrastructureService', () => {
  let service: UserInfrastructureService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserInfrastructureService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return Observable null with id="null"', () => {
    service.fetchUser$('null').subscribe((user) => {
      expect(user).toBeNull();
    });
  });

  it('should return Observable undefined with id="undefined"', () => {
    service.fetchUser$('undefined').subscribe((user) => {
      expect(user).toBeUndefined();
    });
  });

  it('should return Observable EXISTING_USER_NORMAL', () => {
    service.fetchUser$('testId').subscribe((user) => {
      expect(user).toEqual(USER_NORMAL);
    });
  });
});

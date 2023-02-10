import { User } from './user.model';
import { NEW_USER_NORMAL, EXISTING_USER_NORMAL } from './user.mock';

describe('User', () => {
  it('should create an instance with NEW_USER_NORMAL', () => {
    expect(new User(NEW_USER_NORMAL)).toBeTruthy();
  });

  it('should create an User instance with NEW_USER_NORMAL', () => {
    expect(new User(NEW_USER_NORMAL) instanceof User).toBeTrue();
  });

  it('should create an instance with EXISTING_USER_NORMAL', () => {
    expect(new User(EXISTING_USER_NORMAL)).toBeTruthy();
  });

  it('should create an User instance with EXISTING_USER_NORMAL', () => {
    expect(new User(EXISTING_USER_NORMAL) instanceof User).toBeTrue();
  });

  it('should create an instance with NEW_USER_NORMAL and toObject should recover NEW_USER_NORMAL', () => {
    expect(new User(NEW_USER_NORMAL).toObject()).toEqual(NEW_USER_NORMAL);
  });

  it('should create an instance with EXISTING_USER_NORMAL and toObject should recover EXISTING_USER_NORMAL', () => {
    expect(new User(EXISTING_USER_NORMAL).toObject()).toEqual(EXISTING_USER_NORMAL);
  });
});

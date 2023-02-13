import { BaseUser, BaseUserUpdate, NewUser, User, UserUpdate } from './user.type';

export const BASE_USER_NORMAL: BaseUser = {
  name: 'Base User Test Normal Name',
  photoUrl: 'https://placehold.jp/300x200.png',
  bio: 'This is test bio.',
  provider: 'google',
  google: 'test@gmail.com',
  twitter: 'twitter_id_test',
  github: 'github_id_test',
};

export const NEW_USER_NORMAL: NewUser = {
  ...BASE_USER_NORMAL,
  createdAt: new Date(2023, 2 - 1, 11, 6, 0, 0),
  updatedAt: new Date(2023, 2 - 1, 11, 6, 0, 0),
};

export const USER_NORMAL: User = {
  id: 'testId',
  ...NEW_USER_NORMAL,
};

export const BASE_USER_UPDATE_NORMAL: BaseUserUpdate = {
  id: 'testId',
  name: 'Base User Update Test Name',
  photoUrl: 'https://placehold.jp/600x400.png',
  bio: 'This is test updated bio.',
};

export const USER_UPDATE_NORMAL: UserUpdate = {
  ...BASE_USER_UPDATE_NORMAL,
  updatedAt: new Date(2024, 3 - 1, 12, 7, 1, 1),
};

export const UPDATED_USER_NORMAL: User = {
  id: 'testId',
  name: 'Base User Update Test Name',
  photoUrl: 'https://placehold.jp/600x400.png',
  bio: 'This is test updated bio.',
  provider: 'google',
  google: 'test@gmail.com',
  twitter: 'twitter_id_test',
  github: 'github_id_test',
  createdAt: new Date(2023, 2 - 1, 11, 6, 0, 0),
  updatedAt: new Date(2024, 3 - 1, 12, 7, 1, 1),
};

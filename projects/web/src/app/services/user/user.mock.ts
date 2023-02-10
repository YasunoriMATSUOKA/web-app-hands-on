import { UserInterface } from './user.model';

export const NEW_USER_NORMAL: UserInterface = {
  id: '',
  name: 'New User Test Normal Name',
  photoUrl: 'https://placehold.jp/300x200.png',
  bio: 'This is test bio.',
  google: 'test@gmail.com',
  twitter: 'twitter_id_test',
  github: 'github_id_test',
};

export const EXISTING_USER_NORMAL: UserInterface = {
  id: 'testId',
  name: 'Existing User Test Normal Name',
  photoUrl: 'https://placehold.jp/300x200.png',
  bio: 'This is test bio.',
  google: 'test@gmail.com',
  twitter: 'twitter_id_test',
  github: 'github_id_test',
};

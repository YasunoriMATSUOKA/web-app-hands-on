export interface UserInterface {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  provider: 'google' | 'twitter' | 'github';
  google: string;
  twitter: string;
  github: string;
}

export class User {
  id: string;
  name: string;
  photoUrl: string;
  bio: string;
  provider: 'google' | 'twitter' | 'github';
  google: string;
  twitter: string;
  github: string;

  constructor(user: UserInterface) {
    this.id = user.id;
    this.name = user.name;
    this.photoUrl = user.photoUrl;
    this.bio = user.bio;
    this.provider = user.provider;
    this.google = user.google;
    this.twitter = user.twitter;
    this.github = user.github;
  }

  toObject(): UserInterface {
    return {
      id: this.id,
      name: this.name,
      photoUrl: this.photoUrl,
      bio: this.bio,
      provider: this.provider,
      google: this.google,
      twitter: this.twitter,
      github: this.github,
    };
  }
}

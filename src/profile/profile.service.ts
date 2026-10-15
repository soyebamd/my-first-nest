import { Injectable, NotFoundException, ParseUUIDPipe } from '@nestjs/common';
import { randomUUID } from 'crypto';

@Injectable()
export class ProfileService {
  private profiles = [
    {
      id: randomUUID(),
      name: 'Brianna Watts',
      description: `Looking for someone to merge with my heart. I’m a full-stack romantic who refactors my feelings until they pass all tests. Bonus points if you can debug my issues while we pair program over coffee. Let’s commit to something beautiful together.`,
    },
    {
      id: randomUUID(),
      name: 'Jasper Quinn',
      description: `Seeking a partner in crime to compile my heart. Must be comfortable with the terminal because I only speak fluent bash. Swipe right if you can appreciate a good kernel panic every now and then.`,
    },
    {
      id: randomUUID(),
      name: 'Leo Park',
      description: `You think you know VIM? Try Neovim. I'll make your modal dreams come true. Want to escape the matrix and explore the perfect keyboard shortcut for love?`,
    },
  ];

  findAll() {
    return this.profiles;
  }

  findOne(id: string) {
    //NotFoundException

    const profile = this.profiles.find((profile) => profile.id === id);

    if (!profile) {
      throw new NotFoundException(`the ID ${id} not found`);
    }

    return profile;
  }

  create(post: any) {
    const addProfile = {
      id: randomUUID(),
      ...post,
    };

    this.profiles.push(addProfile);
    return addProfile;
  }

  update(id: string, post: any) {
    const find = this.profiles.find((profile) => profile.id === id);
    if (!find) {
      throw new NotFoundException(`the ID ${id} not found`);
    }

    find.name = post.name;
    find.description = post.description;

    return find;
  }

  remove(id: string) {
    const index = this.profiles.findIndex((profile) => profile.id === id);

    if (index === -1) {
      throw new NotFoundException(`Profile with ID ${id} not found`);
    }

    this.profiles.splice(index, 1);
  }
}

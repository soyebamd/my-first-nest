import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  let service: ProfileService;
  let module: TestingModule;

  beforeEach(async () => {
    module = await Test.createTestingModule({
      providers: [ProfileService],
    }).compile();

    await module.init();
    service = module.get<ProfileService>(ProfileService);
  });

  afterEach(async () => {
    await module.close();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('creates, reads, updates, and deletes profiles in SQLite', async () => {
    const profile = await service.create({
      name: 'Test Profile',
      description: 'Created by the service test',
    });

    try {
      expect(await service.findOne(profile.id)).toEqual(profile);

      const updated = await service.update(profile.id, {
        name: 'Updated Test Profile',
      });
      expect(updated.name).toBe('Updated Test Profile');

      await service.remove(profile.id);
      await expect(service.findOne(profile.id)).rejects.toThrow(
        `Profile with ID ${profile.id} not found`,
      );
    } finally {
      const profiles = await service.findAll();
      if (profiles.some((item) => item.id === profile.id)) {
        await service.remove(profile.id);
      }
    }
  });
});

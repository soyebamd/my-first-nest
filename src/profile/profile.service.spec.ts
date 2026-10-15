import { Test, TestingModule } from '@nestjs/testing';
import { ProfileService } from './profile.service.js';

describe('ProfileService', () => {
  let service: ProfileService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProfileService],
    }).compile();

    service = module.get<ProfileService>(ProfileService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('removes a profile by ID', () => {
    const profile = service.findAll()[0];

    service.remove(profile.id);

    expect(service.findOne(profile.id)).toBeUndefined();
  });

  it('throws when the profile ID does not exist', () => {
    expect(() => service.remove('missing-profile')).toThrow(
      'Profile with ID missing-profile not found',
    );
  });
});

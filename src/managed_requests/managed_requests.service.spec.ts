import { Test, TestingModule } from '@nestjs/testing';
import { ManagedRequestsService } from './managed_requests.service';

describe('ManagedRequestsService', () => {
  let service: ManagedRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManagedRequestsService],
    }).compile();

    service = module.get<ManagedRequestsService>(ManagedRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

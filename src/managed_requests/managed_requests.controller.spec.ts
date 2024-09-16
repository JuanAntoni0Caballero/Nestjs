import { Test, TestingModule } from '@nestjs/testing';
import { ManagedRequestsController } from './managed_requests.controller';
import { ManagedRequestsService } from './managed_requests.service';

describe('ManagedRequestsController', () => {
  let controller: ManagedRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ManagedRequestsController],
      providers: [ManagedRequestsService],
    }).compile();

    controller = module.get<ManagedRequestsController>(ManagedRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReservationRequestsController } from './reservation_requests.controller';
import { ReservationRequestsService } from './reservation_requests.service';

describe('ReservationRequestsController', () => {
  let controller: ReservationRequestsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReservationRequestsController],
      providers: [ReservationRequestsService],
    }).compile();

    controller = module.get<ReservationRequestsController>(ReservationRequestsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

import { Test, TestingModule } from '@nestjs/testing';
import { ReservationRequestsService } from './reservation_requests.service';

describe('ReservationRequestsService', () => {
  let service: ReservationRequestsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReservationRequestsService],
    }).compile();

    service = module.get<ReservationRequestsService>(ReservationRequestsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

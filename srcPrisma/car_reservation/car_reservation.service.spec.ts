import { Test, TestingModule } from '@nestjs/testing';
import { CarReservationService } from './car_reservation.service';

describe('CarReservationService', () => {
  let service: CarReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CarReservationService],
    }).compile();

    service = module.get<CarReservationService>(CarReservationService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

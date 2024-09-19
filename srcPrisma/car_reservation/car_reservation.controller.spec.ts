import { Test, TestingModule } from '@nestjs/testing';
import { CarReservationController } from './car_reservation.controller';
import { CarReservationService } from './car_reservation.service';

describe('CarReservationController', () => {
  let controller: CarReservationController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CarReservationController],
      providers: [CarReservationService],
    }).compile();

    controller = module.get<CarReservationController>(CarReservationController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

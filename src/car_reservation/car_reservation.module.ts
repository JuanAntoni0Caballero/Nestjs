import { Module } from '@nestjs/common';
import { CarReservationService } from './car_reservation.service';
import { CarReservationController } from './car_reservation.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car_reservation } from './entities/car_reservation.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Car_reservation])],
  controllers: [CarReservationController],
  providers: [CarReservationService],
  exports: [CarReservationService]
})
export class CarReservationModule { }

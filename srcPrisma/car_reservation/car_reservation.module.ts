import { Module } from '@nestjs/common';
import { CarReservationService } from './car_reservation.service';
import { CarReservationController } from './car_reservation.controller';
import { PrismaService } from '../prisma.service';


@Module({
  controllers: [CarReservationController],
  providers: [CarReservationService, PrismaService],
})
export class CarReservationModule { }

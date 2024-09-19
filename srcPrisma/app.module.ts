import { Module } from '@nestjs/common';
import { CarModule } from './cars/car.module';
import { CarReservationModule } from './car_reservation/car_reservation.module';
import { ReservationRequestsModule } from './reservation_requests/reservation_requests.module';

@Module({
  imports: [
    CarModule,
    CarReservationModule,
    ReservationRequestsModule,
  ],
})
export class AppModule { }

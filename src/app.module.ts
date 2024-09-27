import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarModule } from './cars/car.module';
import { CarReservationModule } from './car_reservation/car_reservation.module';
import { ReservationRequestsModule } from './reservation_requests/reservation_requests.module';
import { ManagedRequestsModule } from './managed_requests/managed_requests.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: process.env.DB_SYNC === 'false',
      timezone: process.env.DB_TIMEZONE,
    }),
    CarModule,
    CarReservationModule,
    ReservationRequestsModule,
    ManagedRequestsModule,
  ],
})
export class AppModule { }

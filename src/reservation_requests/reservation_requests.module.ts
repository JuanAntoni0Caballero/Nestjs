import { Module } from '@nestjs/common';
import { ReservationRequestsService } from './reservation_requests.service';
import { ReservationRequestsController } from './reservation_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReservationRequest } from './entities/reservation_request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ReservationRequest])],
  controllers: [ReservationRequestsController],
  providers: [ReservationRequestsService],
})
export class ReservationRequestsModule { }

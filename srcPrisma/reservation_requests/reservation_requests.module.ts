import { Module } from '@nestjs/common';
import { ReservationRequestsService } from './reservation_requests.service';
import { ReservationRequestsController } from './reservation_requests.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [ReservationRequestsController],
  providers: [ReservationRequestsService, PrismaService],
})
export class ReservationRequestsModule { }

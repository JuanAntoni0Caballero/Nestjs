import { Module } from '@nestjs/common';
import { ManagedRequestsService } from './managed_requests.service';
import { ManagedRequestsController } from './managed_requests.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ManagedRequest } from './entities/managed_request.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ManagedRequest])],
  controllers: [ManagedRequestsController],
  providers: [ManagedRequestsService],
})
export class ManagedRequestsModule { }

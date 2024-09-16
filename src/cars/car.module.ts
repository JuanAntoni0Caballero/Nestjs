import { Module } from '@nestjs/common';
import { CarController } from './car.controller';
import { CarService } from './car.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Car])],
    controllers: [CarController],
    providers: [CarService],
    exports: [CarService]
})
export class CarModule { }

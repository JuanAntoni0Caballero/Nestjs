import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarReservationDto } from './dto/create-car_reservation.dto';
import { UpdateCarReservationDto } from './dto/update-car_reservation.dto';
import { Car_reservation } from '../car_reservation/entities/car_reservation.entity';

@Injectable()
export class CarReservationService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<Car_reservation[]> {
    return this.prisma.car_reservation.findMany({
      include: {
        car: true,
        reservation_request: true,
      },
    });
  }

  async findOne(id: number): Promise<Car_reservation | null> {
    return this.prisma.car_reservation.findUnique({
      where: { id },
      include: {
        car: true,
        reservation_request: true,
      },
    });
  }

  async search(query: any): Promise<Car_reservation[]> {
    return this.prisma.car_reservation.findMany({
      where: {
        AND: [
          query.applicantEmail ? { reservation_request: { applicantEmail: { contains: query.applicantEmail } } } : {},
          query.applicantName ? { reservation_request: { applicantName: { contains: query.applicantName } } } : {},
          query.sinceDate ? { reservation_request: { reservation_date: { gte: new Date(query.sinceDate) } } } : {},
          query.toDate ? { reservation_request: { reservation_date: { lte: new Date(query.toDate) } } } : {},
          query.plateNumber ? { car: { plateNumber: query.plateNumber } } : {},
          query.duration ? { duration: query.duration } : {},
          query.brand ? { car: { brand: { contains: query.brand } } } : {},
          query.model ? { car: { model: { contains: query.model } } } : {},
          query.state ? { reservation_request: { status: query.state } } : {},
        ],
      },
      include: {
        car: true,
        reservation_request: true,
      },
    });
  }

  async create(createCarReservationDto: CreateCarReservationDto): Promise<Car_reservation> {
    return this.prisma.car_reservation.create({
      data: {
        car: { connect: { id: createCarReservationDto.car_id } },
        reservation_request: { connect: { id: createCarReservationDto.reservation_request_id } },
        date: createCarReservationDto.date,
        duration: createCarReservationDto.duration,
        pickUpDate: createCarReservationDto.pickUpDate,
        returnDate: createCarReservationDto.returnDate,
        status: createCarReservationDto.status,
      },
      include: {
        car: true,
        reservation_request: true,
      },
    });
  }

  async update(id: number, updateCarReservationDto: UpdateCarReservationDto): Promise<Car_reservation> {
    const carReservation = await this.prisma.car_reservation.update({
      where: { id },
      data: {
        car: updateCarReservationDto.car_id ? { connect: { id: updateCarReservationDto.car_id } } : undefined,
        reservation_request: updateCarReservationDto.reservation_request_id ? { connect: { id: updateCarReservationDto.reservation_request_id } } : undefined,
        date: updateCarReservationDto.date,
        duration: updateCarReservationDto.duration,
        pickUpDate: updateCarReservationDto.pickUpDate,
        returnDate: updateCarReservationDto.returnDate,
        status: updateCarReservationDto.status,
      },
      include: {
        car: true,
        reservation_request: true,
      },
    });

    if (!carReservation) {
      throw new NotFoundException(`Car reservation with ID ${id} not found`);
    }

    return carReservation;
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.prisma.car_reservation.delete({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`Car reservation with ID ${id} not found`);
    }

    return { message: 'Registro eliminado con éxito' };
  }
}



// import { Injectable, NotFoundException } from '@nestjs/common';
// import { CreateCarReservationDto } from './dto/create-car_reservation.dto';
// import { UpdateCarReservationDto } from './dto/update-car_reservation.dto';
// import { Car_reservation } from './entities/car_reservation.entity';
// import { Repository } from 'typeorm';
// import { InjectRepository } from '@nestjs/typeorm';

// @Injectable()
// export class CarReservationService {
//   constructor(
//     @InjectRepository(Car_reservation)
//     private car_reservationRepository: Repository<Car_reservation>,
//   ) { }

//   async findAll(): Promise<Car_reservation[]> {
//     return await this.car_reservationRepository.find({
//       relations: ['car', 'reservationRequest'],
//     });

//   }

//   async findOne(id: number): Promise<Car_reservation> {
//     return await this.car_reservationRepository.findOne({
//       where: { id },
//       relations: ['car', 'reservationRequest'],
//     });
//   }

//   async search(query: any): Promise<any[]> {
//     const qb = this.car_reservationRepository.createQueryBuilder('r')
//       .leftJoinAndSelect('r.reservationRequest', 'rr')
//       .leftJoinAndSelect('r.car', 'c');

//     const filters = {
//       applicantEmail: (value: string) => qb.andWhere('rr.applicantEmail LIKE :applicantEmail', { applicantEmail: `%${value}%` }),
//       applicantName: (value: string) => qb.andWhere('rr.applicantName LIKE :applicantName', { applicantName: `%${value}%` }),
//       sinceDate: (value: string) => qb.andWhere('DATE(rr.reservation_date) >= DATE(:sinceDate)', { sinceDate: value }),
//       toDate: (value: string) => qb.andWhere('DATE(rr.reservation_date) <= DATE(:toDate)', { toDate: value }),
//       plateNumber: (value: string) => qb.andWhere('c.plateNumber = :plateNumber', { plateNumber: value }),
//       duration: (value: string) => qb.andWhere('rr.duration = :duration', { duration: value }),
//       brand: (value: string) => qb.andWhere('c.brand LIKE :brand', { brand: `%${value}%` }),
//       model: (value: string) => qb.andWhere('c.model LIKE :model', { model: `%${value}%` }),
//       state: (value: string) => qb.andWhere('rr.state = :state', { state: value }),
//     };

//     Object.entries(query).forEach(([key, value]) => {
//       if (filters[key]) {
//         filters[key](value);
//       }
//     });

//     return await qb.getMany();
//   }

//   async create(createCarReservationDto: CreateCarReservationDto): Promise<Car_reservation> {
//     return await this.car_reservationRepository.save(createCarReservationDto);
//   }

//   async update(id: number, updateCarReservationDto: UpdateCarReservationDto): Promise<Car_reservation> {
//     const carReservation = await this.car_reservationRepository.preload({
//       id,
//       ...updateCarReservationDto,
//     });
//     if (!carReservation) {
//       throw new NotFoundException(`Car reservation with ID ${id} not found`);
//     }

//     return this.car_reservationRepository.save(carReservation);
//   }

//   async remove(id: number): Promise<Car_reservation | { message: string }> {
//     const result = await this.car_reservationRepository.delete(id);
//     if (result.affected === 0) {
//       throw new NotFoundException(`Car reservation with ID ${id} not found`);
//     }
//     return { message: 'Registro eliminado con éxito' }
//   }
// }

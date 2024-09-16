import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateReservationRequestDto } from './dto/create-reservation_request.dto';
import { UpdateReservationRequestDto } from './dto/update-reservation_request.dto';
import { ReservationRequest } from './entities/reservation_request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ReservationRequestsService {
  constructor(
    @InjectRepository(ReservationRequest)
    private ReservationRepository: Repository<ReservationRequest>,
  ) { }

  async findAll(): Promise<ReservationRequest[]> {
    return await this.ReservationRepository.find();
  }

  async findOne(id: number): Promise<ReservationRequest> {
    return await this.ReservationRepository.findOne({ where: { id } });
  }

  async search(query: any): Promise<ReservationRequest[]> {
    const qb = this.ReservationRepository.createQueryBuilder('rr');

    const filters = {
      applicantEmail: (value: string) => qb.andWhere('rr.applicantEmail LIKE :applicantEmail', { applicantEmail: `%${value}%` }),
      applicantName: (value: string) => qb.andWhere('rr.applicantName LIKE :applicantName', { applicantName: `%${value}%` }),
      sinceDate_Reservation: (value: Date) => qb.andWhere('rr.reservation_date >= :sinceDate', { sinceDate: value }),
      sinceDate_Request: (value: Date) => qb.andWhere('rr.request_date >= :sinceDate', { sinceDate: value }),
      toDate_Reservation: (value: Date) => qb.andWhere('rr.reservation_date <= :toDate', { toDate: value }),
      toDate_Request: (value: Date) => qb.andWhere('rr.request_date <= :toDate', { toDate: value }),
      duration: (value: string) => qb.andWhere('rr.duration = :duration', { duration: value }),
      status: (value: string) => qb.andWhere('rr.status = :status', { status: value }),
    };

    Object.entries(query).forEach(([key, value]) => {
      if (filters[key]) {
        filters[key](value);
      }
    });

    // if (query.sinceDate && query.toDate) {
    //   const sinceDate = new Date(query.sinceDate).toISOString().split('T')[0];
    //   const toDate = new Date(query.toDate).toISOString().split('T')[0];

    //   qb.andWhere('rr.reservation_date BETWEEN :sinceDate AND :toDate', {
    //     sinceDate,
    //     toDate
    //   });
    // }

    return await qb.getMany();
  }

  async create(createReservationRequestDto: CreateReservationRequestDto) {
    return await this.ReservationRepository.save(createReservationRequestDto);
  }

  async update(id: number, updateReservationRequestDto: UpdateReservationRequestDto): Promise<ReservationRequest> {
    const reservationRequest = await this.ReservationRepository.preload({
      id,
      ...updateReservationRequestDto,
    });
    if (!reservationRequest) {
      throw new NotFoundException(`ReservationRequest with ID ${id} not found`);
    }
    return this.ReservationRepository.save(reservationRequest);
  }

  async remove(id: number): Promise<ReservationRequest | { message: string }> {
    const data = await this.ReservationRepository.delete(id);
    if (data.affected === 0) {
      throw new NotFoundException(`ReservationRequest with ID ${id} not found`);
    }
    return {
      message: 'Registro eliminado con éxito'
    }
  }
}

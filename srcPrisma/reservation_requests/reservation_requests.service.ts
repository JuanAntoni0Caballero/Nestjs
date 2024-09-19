import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateReservationRequestDto } from './dto/create-reservation_request.dto';
import { UpdateReservationRequestDto } from './dto/update-reservation_request.dto';
import { ReservationRequest } from '@prisma/client';


@Injectable()
export class ReservationRequestsService {
  constructor(private readonly prisma: PrismaService) { }

  async findAll(): Promise<ReservationRequest[]> {
    return this.prisma.reservationRequest.findMany();
  }

  async findOne(id: number): Promise<ReservationRequest | null> {
    return this.prisma.reservationRequest.findUnique({
      where: { id },
    });
  }

  async search(query: any): Promise<ReservationRequest[]> {
    return this.prisma.reservationRequest.findMany({
      where: {
        AND: [
          query.applicantEmail ? { applicantEmail: { contains: query.applicantEmail } } : {},
          query.applicantName ? { applicantName: { contains: query.applicantName } } : {},
          query.sinceDate_Reservation ? { reservation_date: { gte: new Date(query.sinceDate_Reservation) } } : {},
          query.sinceDate_Request ? { requests_date: { gte: new Date(query.sinceDate_Request) } } : {},
          query.toDate_Reservation ? { reservation_date: { lte: new Date(query.toDate_Reservation) } } : {},
          query.toDate_Request ? { requests_date: { lte: new Date(query.toDate_Request) } } : {},
          query.duration ? { duration: query.duration } : {},
          query.status ? { status: query.status } : {},
        ],
      },
    });
  }

  async create(createReservationRequestDto: CreateReservationRequestDto): Promise<ReservationRequest> {
    return this.prisma.reservationRequest.create({
      data: createReservationRequestDto,
    });
  }

  async update(id: number, updateReservationRequestDto: UpdateReservationRequestDto): Promise<ReservationRequest> {
    const reservationRequest = await this.prisma.reservationRequest.update({
      where: { id },
      data: updateReservationRequestDto,
    });

    if (!reservationRequest) {
      throw new NotFoundException(`ReservationRequest with ID ${id} not found`);
    }

    return reservationRequest;
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.prisma.reservationRequest.delete({
      where: { id },
    });

    if (!result) {
      throw new NotFoundException(`ReservationRequest with ID ${id} not found`);
    }

    return { message: 'Registro eliminado con éxito' };
  }
}

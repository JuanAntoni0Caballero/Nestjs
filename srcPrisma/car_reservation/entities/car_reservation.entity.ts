import { ApiProperty } from '@nestjs/swagger';
import { CarEntity } from '../../cars/entities/car.entity';
import { ReservationRequestEntity } from '../../reservation_requests/entities/reservation_request.entity';
import { Duration, ReservationStatus } from '@prisma/client';

export class Car_reservation {
    id: number;

    @ApiProperty({ example: 1, description: 'ID del coche reservado' })
    car: CarEntity;

    @ApiProperty({ example: 1, description: 'ID de la petición de reserva' })
    reservation_request: ReservationRequestEntity;

    @ApiProperty({ example: '2023-05-15', description: 'Fecha de la reserva' })
    date: Date;

    @ApiProperty({ example: 'Morning', description: 'Periodo de la reserva', enum: Duration })
    duration: Duration;

    @ApiProperty({ example: '2023-05-15', description: 'Fecha de recogida' })
    pickUpDate: Date

    @ApiProperty({ example: '2023-05-15', description: 'Fecha de devolución' })
    returnDate: Date;

    @ApiProperty({
        example: ReservationStatus.Pending,
        description: 'Estado de la reserva',
        enum: ReservationStatus
    })
    status: ReservationStatus;
}

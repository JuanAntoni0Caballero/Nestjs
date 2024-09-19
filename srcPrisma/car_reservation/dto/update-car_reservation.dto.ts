import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsDate, IsEnum, IsOptional } from 'class-validator';
import { Duration, ReservationStatus } from '@prisma/client';

export class UpdateCarReservationDto {
    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID del coche reservado' })
    car_id: number;

    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({ example: 1, description: 'ID de la peticion de reserva' })
    reservation_request_id?: number;

    @IsDate()
    @IsNotEmpty()
    @Type(() => Date)
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de la reserva' })
    date?: Date;

    @IsEnum(Duration)
    @IsNotEmpty()
    @ApiProperty({ example: 'Morning', description: 'Periodo de la reserva', enum: Duration })
    duration?: Duration

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de recogida' })
    pickUpDate?: Date;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de devolución' })
    returnDate?: Date;

    @IsEnum(ReservationStatus)
    @IsNotEmpty()
    @ApiProperty({
        example: ReservationStatus.Pending,
        description: 'Estado de la reserva',
        enum: ReservationStatus
    })
    status?: ReservationStatus;
}

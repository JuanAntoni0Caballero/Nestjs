import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsNumber, IsNotEmpty, IsString, IsBoolean } from 'class-validator';
import { ReservationRequestDuration, ReservationRequestStatus } from './enum'

export class UpdateReservationRequestDto {
    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Mañana', description: 'Periodo de uso' })
    duration: ReservationRequestDuration;

    @IsNotEmpty()
    @IsBoolean()
    @ApiProperty({ example: 'true', description: '¿Pasa la noche fuera?' })
    overnight: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Visita a cliente', description: 'Motivo por que necesita vehículo' })
    reason: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 20, description: 'Distancia que se espera recorrer' })
    expectedDistance: number;

    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de la petición' })
    requests_date: Date

    @Type(() => Date)
    @IsNotEmpty()
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de reserva' })
    reservation_date: Date

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Pendiente', description: 'Estado de la reserva' })
    status: ReservationRequestStatus;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del solicitante' })
    applicantName: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'juanperez@example.com', description: 'Correo electrónico del solicitante' })
    applicantEmail: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Comentarios relativos a la reserva', description: 'Visita urgente' })
    observations: string;
}

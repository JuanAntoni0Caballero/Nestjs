import { ApiProperty } from '@nestjs/swagger';
import { Duration, ReservationRequestStatus } from '@prisma/client';

export class ReservationRequestEntity {
    id: number;

    @ApiProperty({ example: 'Mañana', description: 'Periodo de uso', enum: Duration })
    duration: Duration;

    @ApiProperty({ example: 'true', description: '¿Pasa la noche fuera?' })
    overnight: boolean;

    @ApiProperty({ example: 'Visita a cliente', description: 'Motivo por que necesita vehículo' })
    reason: string;

    @ApiProperty({ example: 20, description: 'Distancia que se espera recorrer' })
    expectedDistance: number;

    @ApiProperty({ example: '2023-05-15', description: 'Fecha de petición' })
    requests_date: Date

    @ApiProperty({ example: '2023-05-15', description: 'Fecha de reserva' })
    reservation_date: Date

    @ApiProperty({ example: 'Pending', description: 'Estado de la reserva', enum: ReservationRequestStatus })
    status: ReservationRequestStatus;

    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del solicitante' })
    applicantName: string;


    @ApiProperty({ example: 'juanperez@example.com', description: 'Correo electrónico del solicitante' })
    applicantEmail: string;


    @ApiProperty({ example: 'Comentarios relativos a la reserva', description: 'Visita urgente' })
    observations: string;
}

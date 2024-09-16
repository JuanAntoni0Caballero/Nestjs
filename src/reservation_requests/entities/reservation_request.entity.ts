import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';


@Entity('reservation_request')
export class ReservationRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ example: 'Mañana', description: 'Periodo de uso' })
    duration: string;

    @Column()
    @ApiProperty({ example: 'true', description: '¿Pasa la noche fuera?' })
    overnight: boolean;

    @Column()
    @ApiProperty({ example: 'Visita a cliente', description: 'Motivo por que necesita vehículo' })
    reason: string;

    @Column()
    @ApiProperty({ example: 20, description: 'Distancia que se espera recorrer' })
    expectedDistance: number;

    @Column()
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de petición' })
    requests_date: Date

    @Column()
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de reserva' })
    reservation_date: Date

    @Column()
    @ApiProperty({ example: 'Pendiente', description: 'Estado de la reserva' })
    status: string;

    @Column()
    @ApiProperty({ example: 'Juan Pérez', description: 'Nombre del solicitante' })
    applicantName: string;


    @Column()
    @ApiProperty({ example: 'juanperez@example.com', description: 'Correo electrónico del solicitante' })
    applicantEmail: string;


    @Column()
    @ApiProperty({ example: 'Comentarios relativos a la reserva', description: 'Visita urgente' })
    observations: string;
}

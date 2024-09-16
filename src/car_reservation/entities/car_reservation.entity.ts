import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, IsNull } from 'typeorm';
import { Car } from '../../cars/entities/car.entity';
import { ReservationRequest } from '../../reservation_requests/entities/reservation_request.entity';
import { ReservationStatus, ReservationDuration } from '../dto/enum';

@Entity('car_reservation')
export class Car_reservation {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    @ApiProperty({ example: 1, description: 'ID del coche reservado' })
    car: Car;

    @ManyToOne(() => ReservationRequest)
    @JoinColumn({ name: 'reservation_request_id' })
    @ApiProperty({ example: 1, description: 'ID de la petición de reserva' })
    reservationRequest: ReservationRequest;

    @Column()
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de la reserva' })
    date: Date;

    @Column({
        type: 'enum',
        enum: ReservationDuration,
    })
    @ApiProperty({ example: 'Morning', description: 'Periodo de la reserva', enum: ReservationDuration })
    duration: ReservationDuration;

    @Column({ nullable: true })
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de recogida' })
    pickUpDate: Date

    @Column({ nullable: true })
    @ApiProperty({ example: '2023-05-15', description: 'Fecha de devolución' })
    returnDate: Date;

    @Column({
        type: 'enum',
        enum: ReservationStatus,
        default: ReservationStatus.Pending
    })
    @ApiProperty({
        example: ReservationStatus.Pending,
        description: 'Estado de la reserva',
        enum: ReservationStatus
    })
    status: ReservationStatus;
}

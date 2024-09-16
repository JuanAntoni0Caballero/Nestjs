import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { ReservationRequest } from '../../reservation_requests/entities/reservation_request.entity';
import { Car } from 'src/cars/entities/car.entity';

@Entity('managed_requests')
export class ManagedRequest {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => ReservationRequest)
    @JoinColumn({ name: 'reservation_request_id' })
    @ApiProperty({ example: 1, description: 'ID de la petición de reserva' })
    reservation_request: ReservationRequest;

    @ManyToOne(() => Car)
    @JoinColumn({ name: 'car_id' })
    @ApiProperty({ example: 1, description: 'ID del coche' })
    car: Car;

    @Column()
    @ApiProperty({ example: 'Autorizado para viajar', description: 'Comentarios sobre la reserva' })
    comments: string;

    @Column()
    @ApiProperty({ example: 'Pendiente', description: 'Estado de la reserva' })
    state: string;
}

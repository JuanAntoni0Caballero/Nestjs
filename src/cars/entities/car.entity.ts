import { ApiProperty } from '@nestjs/swagger';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { CarEcologicalLabel, CarStatus, CarTransmission } from '../dto/enum';

@Entity('car')
export class Car {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @ApiProperty({ example: 'Toyota', description: 'Marca del coche' })
    brand: string;

    @Column()
    @ApiProperty({ example: 'Corolla', description: 'Modelo del coche' })
    model: string;

    @Column()
    @ApiProperty({ example: '1234ABC', description: 'Número de placa del coche' })
    plateNumber: string;

    @Column()
    @ApiProperty({ example: 2023, description: 'Año de matriculación del coche' })
    registrationYear: number;

    @Column()
    @ApiProperty({ example: 'true', description: '¿Tiene permiso de acceso a Mercamadrid?' })
    mercamadridPermission: boolean;

    @Column({
        type: 'enum',
        enum: CarEcologicalLabel,
    })
    @ApiProperty({ example: 'B', description: 'Etiqueta medioambiental del coche' })
    ecologicalLabel: CarEcologicalLabel;

    @Column()
    @ApiProperty({ example: 'Turismo', description: 'Tipo de vehículo' })
    type: string;

    @Column({
        type: 'enum',
        enum: CarTransmission,
    })
    @ApiProperty({ example: 'Automatic', description: 'Tipo de caja de cambios' })
    transmission: CarTransmission;

    @Column()
    @ApiProperty({ example: 'Lease Plan', description: 'Renting propietario' })
    renting: string;

    @Column()
    @ApiProperty({ example: '+3499999999', description: 'Telefono de asistencia del renting' })
    assistanceTelephone: string;

    @Column({
        type: 'enum',
        enum: CarStatus,
        default: CarStatus.Available
    })
    @ApiProperty({ example: 'In use', description: 'Estado actual en el que se encuentra el vehículo' })
    status: CarStatus;
}

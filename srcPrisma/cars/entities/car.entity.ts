import { ApiProperty } from '@nestjs/swagger';
import { CarEcologicalLabel, CarStatus, CarTransmission } from '@prisma/client';

export class CarEntity {
    id: number;

    @ApiProperty({ example: 'Toyota', description: 'Marca del coche' })
    brand: string;

    @ApiProperty({ example: 'Corolla', description: 'Modelo del coche' })
    model: string;

    @ApiProperty({ example: '1234ABC', description: 'Número de placa del coche' })
    plateNumber: string;

    @ApiProperty({ example: 2023, description: 'Año de matriculación del coche' })
    registrationYear: number;

    @ApiProperty({ example: 'true', description: '¿Tiene permiso de acceso a Mercamadrid?' })
    mercamadridPermission: boolean;

    @ApiProperty({ example: 'B', description: 'Etiqueta medioambiental del coche' })
    ecologicalLabel: CarEcologicalLabel;

    @ApiProperty({ example: 'Turismo', description: 'Tipo de vehículo' })
    type: string;

    @ApiProperty({ example: 'Automatic', description: 'Tipo de caja de cambios' })
    transmission: CarTransmission;

    @ApiProperty({ example: 'Lease Plan', description: 'Renting propietario' })
    renting: string;

    @ApiProperty({ example: '+3499999999', description: 'Telefono de asistencia del renting' })
    assistanceTelephone: string;

    @ApiProperty({ example: 'In use', description: 'Estado actual en el que se encuentra el vehículo' })
    status: CarStatus;
}

import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNumber, IsNotEmpty } from 'class-validator';

export class CreateCarDto {

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Toyota', description: 'Marca del coche' })
    brand: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Corolla', description: 'Modelo del coche' })
    model: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '1234ABC', description: 'Número de placa del coche' })
    plateNumber: string;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 2023, description: 'Año de matriculación del coche' })
    registrationYear: number;

    @IsBoolean()
    @IsNotEmpty()
    @ApiProperty({ example: 'true', description: '¿Tiene permiso de acceso a Mercamadrid?' })
    mercamadridPermission: boolean;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'B', description: 'Etiqueta medioambiental del coche' })
    ecologicalLabel: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Turismo', description: 'Tipo de vehículo' })
    type: string;


    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Automático', description: 'Tipo de caja de cambios' })
    transmission: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Lease Plan', description: 'Renting propietario' })
    renting: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: '+3499999999', description: 'Telefono de asistencia del renting' })
    assistanceTelephone: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'in_use', description: 'Estado actual en el que se encuentra el vehículo' })
    status: string;
}
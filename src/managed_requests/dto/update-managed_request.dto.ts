import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class UpdateManagedRequestDto {

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID de la peticion de reserva' })
    reservation_request_id?: number;

    @IsNumber()
    @IsNotEmpty()
    @ApiProperty({ example: 1, description: 'ID del coche' })
    car_id?: number;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Autorizado para viajar', description: 'Comentarios sobre la reserva' })
    comments?: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty({ example: 'Pendiente', description: 'Estado de la reserva' })
    state?: string;
}

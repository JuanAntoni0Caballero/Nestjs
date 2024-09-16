import { Controller, Get, Post, Body, Param, Delete, NotFoundException, HttpCode, ParseIntPipe, Put, Query } from '@nestjs/common';
import { CarReservationService } from './car_reservation.service';
import { CreateCarReservationDto } from './dto/create-car_reservation.dto';
import { UpdateCarReservationDto } from './dto/update-car_reservation.dto';
import { Car_reservation } from './entities/car_reservation.entity';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('car-reservation')
@ApiTags('Car Reservation')
export class CarReservationController {
  constructor(private readonly carReservationService: CarReservationService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las reservas de vehículos' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: Car_reservation,
    isArray: true
  })
  @ApiResponse({
    status: 404,
    description: 'Error al buscar reservas de vehículos.'
  })
  async findAll() {
    const cars_reservations = await this.carReservationService.findAll();
    if (!cars_reservations) {
      throw new NotFoundException('Error al buscar reservas de vehículos.');
    } else if (cars_reservations.length === 0) {
      return { message: 'No hay datos que mostrar.' };
    } else {
      return cars_reservations;
    }
  }

  @Get('/search')
  @ApiOperation({ summary: 'Buscar reservas de vehículos' })
  @ApiQuery({
    name: 'query',
    description: 'Parámetros de búsqueda',
    type: 'object'
  })
  async search(@Query() query: any) {
    const cars_reservations = await this.carReservationService.search(query);
    if (!cars_reservations) {
      throw new NotFoundException('Error al buscar reservas de vehículos.');
    } else if (cars_reservations.length === 0) {
      return { message: 'No hay datos que mostrar.' };
    } else {
      return cars_reservations;
    }
  }


  @Get(':id')
  @ApiOperation({ summary: 'Obtener una reserva de vehículo por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: Car_reservation
  })
  @ApiResponse({
    status: 404,
    description: 'Error al buscar reserva de vehículo.'
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.carReservationService.findOne(id);
  }


  @Post()
  @ApiOperation({ summary: 'Crear una reserva de vehículo' })
  @ApiResponse({
    status: 201,
    description: 'Operación exitosa',
    type: Car_reservation
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear reserva de vehículo.'
  })
  @HttpCode(201)
  create(@Body() createCarReservationDto: CreateCarReservationDto): Promise<Car_reservation> {
    return this.carReservationService.create(createCarReservationDto);
  }


  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una reserva de vehículo existente' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: Car_reservation
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar reserva de vehículo.'
  })
  @HttpCode(200)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateCarReservationDto: UpdateCarReservationDto): Promise<Car_reservation> {
    return this.carReservationService.update(id, updateCarReservationDto);
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una reserva de vehículo existente' })
  @ApiResponse({
    status: 204,
    description: 'Operación exitosa'
  })
  @ApiResponse({
    status: 404,
    description: 'Error al eliminar reserva de vehículo.'
  })
  @HttpCode(204)
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.carReservationService.remove(id);
  }
}

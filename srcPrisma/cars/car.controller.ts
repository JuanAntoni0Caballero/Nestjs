import { Body, Controller, Delete, Get, HttpCode, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiOperation, ApiQuery, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';
import { CarEntity } from './entities/car.entity';
import { CarService } from './car.service';
import { Car } from '@prisma/client';

@Controller('cars')
@ApiTags('Cars')
export class CarController {
    constructor(private readonly carService: CarService) { }

    @Get()
    @ApiOperation({ summary: 'Obtener todos los coches' })
    @ApiResponse({ status: 200, description: 'Operación exitosa', type: CarEntity, isArray: true })
    @ApiResponse({ status: 404, description: 'No se encontraron coches' })
    async getCars(): Promise<Car[] | { message: string }> {
        const cars = await this.carService.getCars();
        if (!cars || cars.length === 0) {
            return { message: 'No hay datos que mostrar' };
        }
        return cars;
    }

    @Get('/search')
    @ApiOperation({ summary: 'Buscar coches' })
    @ApiQuery({ name: 'query', description: 'Parámetros de búsqueda', type: 'object' })
    @ApiResponse({ status: 200, description: 'Operación exitosa', type: CarEntity, isArray: true })
    @ApiResponse({ status: 404, description: 'No se encontraron coches' })
    async searchCar(@Query() query: any): Promise<Car[]> {
        return this.carService.searchCar(query);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Obtener un coche por su ID' })
    @ApiResponse({ status: 200, description: 'Operación exitosa', type: CarEntity })
    @ApiResponse({ status: 404, description: 'Coche no encontrado' })
    async getCar(@Param('id', ParseIntPipe) id: number): Promise<Car> {
        const car = await this.carService.getCar(id);
        if (!car) {
            throw new NotFoundException(`Elemento no encontrado`);
        }
        return car;
    }

    @Post()
    @ApiOperation({ summary: 'Crear un nuevo coche' })
    @ApiResponse({ status: 201, description: 'Operación exitosa', type: CarEntity })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @HttpCode(201)
    async createCar(@Body() createCarDto: CreateCarDto): Promise<Car> {
        return this.carService.createCar(createCarDto);
    }

    @Put(':id')
    @ApiOperation({ summary: 'Actualizar un coche existente' })
    @ApiResponse({ status: 200, description: 'Operación exitosa', type: CarEntity })
    @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiResponse({ status: 404, description: 'Coche no encontrado' })
    @HttpCode(200)
    async update(@Param('id', ParseIntPipe) id: number, @Body() updateCarDto: UpdateCarDto): Promise<Car> {
        return this.carService.update(id, updateCarDto);
    }

    @Delete(':id')
    @ApiOperation({ summary: 'Eliminar un coche existente' })
    @ApiResponse({ status: 204, description: 'Operación exitosa' })
    @ApiResponse({ status: 404, description: 'Coche no encontrado' })
    @HttpCode(204)
    async remove(@Param('id') id: number): Promise<void> {
        await this.carService.removeCar(id);
    }
}
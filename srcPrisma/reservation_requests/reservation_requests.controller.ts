import { Controller, Get, Post, Body, Param, Delete, NotFoundException, ParseIntPipe, HttpCode, Put, Query } from '@nestjs/common';
import { ReservationRequestsService } from './reservation_requests.service';
import { CreateReservationRequestDto } from './dto/create-reservation_request.dto';
import { UpdateReservationRequestDto } from './dto/update-reservation_request.dto';
import { ReservationRequest } from '@prisma/client';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ReservationRequestEntity } from './entities/reservation_request.entity';

@Controller('request')
@ApiTags('Request')
export class ReservationRequestsController {
  constructor(private readonly reservationRequestsService: ReservationRequestsService) { }

  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: ReservationRequestEntity,
    isArray: true
  })
  @ApiResponse({ status: 404, description: 'No se encontraron solicitudes' })
  async findAll() {
    const requests = await this.reservationRequestsService.findAll();
    if (!requests || requests.length === 0) {
      throw new NotFoundException('No requests found');
    }
    return requests;
  }

  @Get('/search')
  @ApiOperation({ summary: 'Buscar solicitudes' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: ReservationRequestEntity,
    isArray: true
  })
  @ApiResponse({ status: 404, description: 'No se encontraron solicitudes' })
  async search(@Query() query: any) {
    const requests = await this.reservationRequestsService.search(query);
    if (!requests || requests.length === 0) {
      throw new NotFoundException('No requests found');
    }
    return requests;
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud por su ID' })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: ReservationRequestEntity })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ReservationRequest> {
    const request = await this.reservationRequestsService.findOne(id);
    if (!request) {
      throw new NotFoundException(`Elemento no encontrado`);
    }
    return request;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva solicitud' })
  @ApiResponse({ status: 201, description: 'Operación exitosa', type: ReservationRequestEntity })
  @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
  @HttpCode(201)
  async create(@Body() createReservationRequestDto: CreateReservationRequestDto): Promise<ReservationRequest> {
    return await this.reservationRequestsService.create(createReservationRequestDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud existente' })
  @ApiResponse({ status: 200, description: 'Operación exitosa', type: ReservationRequestEntity })
  @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
  @HttpCode(200)
  async update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationRequestDto: UpdateReservationRequestDto): Promise<ReservationRequest> {
    return await this.reservationRequestsService.update(id, updateReservationRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una solicitud existente' })
  @ApiResponse({ status: 200, description: 'Operación exitosa' })
  @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.reservationRequestsService.remove(id);
  }
}



// import { Controller, Get, Post, Body, Param, Delete, NotFoundException, ParseIntPipe, HttpCode, Put, Query } from '@nestjs/common';
// import { ReservationRequestsService } from './reservation_requests.service';
// import { CreateReservationRequestDto } from './dto/create-reservation_request.dto';
// import { UpdateReservationRequestDto } from './dto/update-reservation_request.dto';
// import { ReservationRequest } from './entities/reservation_request.entity';
// import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

// @Controller('request')
// @ApiTags('Request')
// export class ReservationRequestsController {
//   constructor(private readonly reservationRequestsService: ReservationRequestsService) { }


//   @Get()
//   @ApiOperation({ summary: 'Obtener todas las solicitudes' })
//   @ApiResponse({
//     status: 200,
//     description: 'Operación exitosa',
//     type: ReservationRequest,
//     isArray: true
//   })
//   @ApiResponse({ status: 404, description: 'No se encontraron solicitudes' })
//   async findAll() {
//     const requests = await this.reservationRequestsService.findAll();
//     if (!requests) {
//       throw new NotFoundException('No requests found');
//     } else if (requests.length === 0) {
//       return { message: 'No hay datos que mostrar' };
//     } else {
//       return requests;
//     }
//   }

//   @Get('/search')
//   @ApiOperation({ summary: 'Buscar solicitudes' })
//   @ApiResponse({
//     status: 200,
//     description: 'Operación exitosa',
//     type: ReservationRequest,
//     isArray: true
//   })
//   @ApiResponse({ status: 404, description: 'No se encontraron solicitudes' })
//   async search(@Query() query: any) {
//     const requests = await this.reservationRequestsService.search(query);
//     if (!requests) {
//       throw new NotFoundException('No requests found');
//     } else if (requests.length === 0) {
//       return { message: 'No hay datos que mostrar' };
//     } else {
//       return requests;
//     }
//   }

//   @Get(':id')
//   @ApiOperation({ summary: 'Obtener una solicitud por su ID' })
//   @ApiResponse({ status: 200, description: 'Operación exitosa', type: ReservationRequest })
//   @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
//   async findOne(@Param('id', ParseIntPipe) id: number): Promise<ReservationRequest> {
//     const request = await this.reservationRequestsService.findOne(id);
//     if (!request) {
//       throw new NotFoundException(`Elemento no encontrado`);
//     }
//     return request;
//   }

//   @Post()
//   @ApiOperation({ summary: 'Crear una nueva solicitud' })
//   @ApiResponse({ status: 201, description: 'Operación exitosa', type: ReservationRequest })
//   @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
//   @HttpCode(201)
//   async create(@Body() createReservationRequestDto: CreateReservationRequestDto): Promise<ReservationRequest> {
//     return await this.reservationRequestsService.create(createReservationRequestDto);
//   }

//   @Put(':id')
//   @ApiOperation({ summary: 'Actualizar una solicitud existente' })
//   @ApiResponse({ status: 200, description: 'Operación exitosa', type: ReservationRequest })
//   @ApiResponse({ status: 400, description: 'Error en los datos de entrada' })
//   @HttpCode(200)
//   async update(@Param('id', ParseIntPipe) id: number, @Body() updateReservationRequestDto: UpdateReservationRequestDto): Promise<ReservationRequest> {
//     return await this.reservationRequestsService.update(id, updateReservationRequestDto);
//   }

//   @Delete(':id')
//   @ApiOperation({ summary: 'Eliminar una solicitud existente' })
//   @ApiResponse({ status: 200, description: 'Operación exitosa' })
//   @ApiResponse({ status: 404, description: 'Solicitud no encontrada' })
//   remove(@Param('id', ParseIntPipe) id: number) {
//     return this.reservationRequestsService.remove(id);
//   }
// }

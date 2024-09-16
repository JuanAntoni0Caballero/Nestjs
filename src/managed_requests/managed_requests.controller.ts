import { Controller, Get, Post, Body, Param, Delete, ParseIntPipe, NotFoundException, HttpCode, Put } from '@nestjs/common';
import { ManagedRequestsService } from './managed_requests.service';
import { CreateManagedRequestDto } from './dto/create-managed_request.dto';
import { UpdateManagedRequestDto } from './dto/update-managed_request.dto';
import { ManagedRequest } from './entities/managed_request.entity';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller('managed-requests')
@ApiTags('Managed Requests')
export class ManagedRequestsController {
  constructor(private readonly managedRequestsService: ManagedRequestsService) { }


  @Get()
  @ApiOperation({ summary: 'Obtener todas las solicitudes' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: ManagedRequest,
    isArray: true
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontraron solicitudes'
  })
  async findAll(): Promise<ManagedRequest[] | { message: string }> {
    const managed = await this.managedRequestsService.findAll();
    if (!managed) {
      throw new NotFoundException('No managed requests found');
    } else if (managed.length === 0) {
      return { message: 'No hay datos que mostrar' };
    } else {
      return managed;
    }
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obtener una solicitud por su ID' })
  @ApiResponse({
    status: 200,
    description: 'Operación exitosa',
    type: ManagedRequest
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró la solicitud'
  })
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<ManagedRequest> {
    const managed = await this.managedRequestsService.findOne(id);
    if (!managed) {
      throw new NotFoundException(`Elemento no encontrado`);
    }
    return managed;
  }

  @Post()
  @ApiOperation({ summary: 'Crear una nueva solicitud' })
  @ApiResponse({
    status: 201,
    description: 'Solicitud creada exitosamente',
    type: ManagedRequest
  })
  @ApiResponse({
    status: 400,
    description: 'Error al crear la solicitud'
  })
  @HttpCode(201)
  create(@Body() createManagedRequestDto: CreateManagedRequestDto): Promise<ManagedRequest> {
    return this.managedRequestsService.create(createManagedRequestDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Actualizar una solicitud' })
  @ApiResponse({
    status: 200,
    description: 'Solicitud actualizada exitosamente',
    type: ManagedRequest
  })
  @ApiResponse({
    status: 400,
    description: 'Error al actualizar la solicitud'
  })
  update(@Param('id', ParseIntPipe) id: number, @Body() updateManagedRequestDto: UpdateManagedRequestDto) {
    return this.managedRequestsService.update(id, updateManagedRequestDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Eliminar una solicitud' })
  @ApiResponse({
    status: 204,
    description: 'Solicitud eliminada exitosamente'
  })
  @ApiResponse({
    status: 404,
    description: 'No se encontró la solicitud'
  })
  remove(@Param('id') id: string) {
    return this.managedRequestsService.remove(+id);
  }
}

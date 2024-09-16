import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateManagedRequestDto } from './dto/create-managed_request.dto';
import { UpdateManagedRequestDto } from './dto/update-managed_request.dto';
import { ManagedRequest } from './entities/managed_request.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ManagedRequestsService {
  constructor(
    @InjectRepository(ManagedRequest)
    private managedRequestRepository: Repository<ManagedRequest>) { }

  findAll(): Promise<ManagedRequest[]> {
    return this.managedRequestRepository.find({
      relations: ['reservation_request', 'car'],
    });
  }

  async findOne(id: number): Promise<ManagedRequest> {
    return await this.managedRequestRepository.findOne({
      where: { id },
      relations: ['car', 'reservation_request'],
    });
  }

  async create(createManagedRequestDto: CreateManagedRequestDto): Promise<ManagedRequest> {
    return await this.managedRequestRepository.save(createManagedRequestDto);
  }

  async update(id: number, updateManagedRequestDto: UpdateManagedRequestDto): Promise<UpdateManagedRequestDto> {
    const managedRequest = await this.managedRequestRepository.preload({
      id,
      ...updateManagedRequestDto,
    });

    if (!managedRequest) {
      throw new NotFoundException(`Managed Request with ID ${id} not found`);
    }
    return this.managedRequestRepository.save(managedRequest);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.managedRequestRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Managed Request with ID ${id} not found`);
    }
    return {
      message: 'Registro eliminado con éxito'
    }
  }
}

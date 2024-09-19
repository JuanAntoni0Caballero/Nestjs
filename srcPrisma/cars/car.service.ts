import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarService {
    constructor(private prisma: PrismaService) { }

    async getCars() {
        return await this.prisma.car.findMany();
    }

    async searchCar(query: any) {

        const where = {};
        if (query.mercamadridPermission) where['mercamadridPermission'] = query.mercamadridPermission;
        if (query.ecologicalLabel) where['ecologicalLabel'] = query.ecologicalLabel;
        if (query.transmission) where['transmission'] = query.transmission;
        if (query.plateNumber) where['plateNumber'] = query.plateNumber;
        if (query.status) where['status'] = query.status;
        if (query.brand) where['brand'] = { contains: query.brand };
        if (query.model) where['model'] = { contains: query.model };
        if (query.type) where['type'] = query.type;

        return this.prisma.car.findMany({
            where,
        });
    }

    async getCar(id: number) {
        const car = await this.prisma.car.findUnique({
            where: { id },
        });
        if (!car) throw new NotFoundException('Car not found');
        return car;
    }

    async createCar(createCarDto: CreateCarDto) {
        return this.prisma.car.create({
            data: createCarDto,
        });
    }

    async update(id: number, updateCarDto: UpdateCarDto) {
        const car = await this.prisma.car.findUnique({ where: { id } });
        if (!car) throw new NotFoundException('Car not found');

        return this.prisma.car.update({
            where: { id },
            data: updateCarDto,
        });
    }

    async removeCar(id: number) {
        const car = await this.prisma.car.findUnique({ where: { id } });
        if (!car) throw new NotFoundException('Car not found');

        await this.prisma.car.delete({
            where: { id },
        });
        return {
            message: 'Registro eliminado con éxito'
        }
    }
}

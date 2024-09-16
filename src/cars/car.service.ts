import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Car } from './entities/car.entity';
import { Repository } from 'typeorm';
import { CreateCarDto } from './dto/create-car.dto';
import { UpdateCarDto } from './dto/update-car.dto';


@Injectable()
export class CarService {
    constructor(
        @InjectRepository(Car)
        private carRepository: Repository<Car>,
    ) { }

    async getCars(): Promise<Car[]> {
        return await this.carRepository.find();
    }

    async getCar(id: number): Promise<Car> {
        return await this.carRepository.findOne({ where: { id } });
    }

    async searchCar(query: any): Promise<Car[]> {
        const qb = this.carRepository.createQueryBuilder('car');

        const filters = {
            mercamadridPermission: (value: boolean) => qb.andWhere('car.mercamadridPermission = :mercamadridPermission', { mercamadridPermission: value }),
            ecologicalLabel: (value: string) => qb.andWhere('car.ecologicalLabel = :ecologicalLabel', { ecologicalLabel: value }),
            transmission: (value: string) => qb.andWhere('car.transmission = :transmission', { transmission: value }),
            plateNumber: (value: string) => qb.andWhere('car.plateNumber = :plateNumber', { plateNumber: value }),
            model: (value: string) => qb.andWhere('car.model LIKE :model', { model: `%${value}%` }),
            brand: (value: string) => qb.andWhere('car.brand LIKE :brand', { brand: `%${value}%` }),
            status: (value: boolean) => qb.andWhere('car.status = :status', { status: value }),
            type: (value: string) => qb.andWhere('car.type = :type', { type: value }),
        };

        Object.entries(query).forEach(([key, value]) => {
            if (filters[key]) {
                filters[key](value);
            }
        });

        if (query.date && query.duration) {
            const formattedDate = new Date(query.date);
            qb.andWhere(qb => {
                const subQuery = qb.subQuery()
                    .select('cr.car_id')
                    .from('car_reservation', 'cr')
                    .where('cr.car_id = car.id')
                    .andWhere('DATE(cr.date) = DATE(:date)', { date: formattedDate })
                    .andWhere('cr.duration = :duration', { duration: query.duration })
                    .getQuery();
                return 'NOT EXISTS ' + subQuery;
            }).setParameter('date', formattedDate);
        }
        return await qb.getMany();
    }


    async createCar(createCarDto: CreateCarDto): Promise<Car> {
        return await this.carRepository.save(createCarDto);
    }

    async update(id: number, updateCarDto: UpdateCarDto): Promise<Car> {
        const car = await this.carRepository.preload({
            id,
            ...updateCarDto,
        });

        if (!car) {
            throw new NotFoundException(`Car with ID ${id} not found`);
        }
        return this.carRepository.save(car);
    }

    async removeCar(id: number): Promise<Car | { message: string }> {
        const result = await this.carRepository.delete(id);
        if (result.affected === 0) {
            throw new NotFoundException(`Car reservation with ID ${id} not found`);
        }
        return {
            message: 'Registro eliminado con éxito'
        }
    }
}

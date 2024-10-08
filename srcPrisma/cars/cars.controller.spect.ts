import { Test, TestingModule } from '@nestjs/testing';
import { CarController } from './car.controller';
import { CarService } from './car.service';

describe('CarController', () => {
    let carController: CarController;

    beforeEach(async () => {
        const app: TestingModule = await Test.createTestingModule({
            controllers: [CarController],
            providers: [CarService],
        }).compile();

        carController = app.get<CarController>(CarController);
    });

    describe('root', () => {
        it('should return "Todos los coches registrados!"', () => {
            expect(carController.getCars()).toBe('Todos los coches registrados!');
        });
    });
});

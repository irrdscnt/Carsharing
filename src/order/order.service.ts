import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderEntity } from './entity';
import { Model } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from './dto';
import { ICar } from './interface';

@Injectable()
export class OrderService {
  private DB: ICar[];
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly entity: Model<OrderEntity>,
  ) {
    this.DB = [
      {
        carId: 1,
        brand: 'BMW 530',
        price: 100,
      },
      {
        carId: 2,
        brand: 'Toyota Camry',
        price: 80,
      },
      {
        carId: 3,
        brand: 'Ford Focus',
        price: 50,
      },
    ];
  }
  async findAll() {
    return await this.entity.find();
  }

  async findCarId(id: number): Promise<ICar> {
    const car = this.DB.find((car: ICar) => car.carId === id);
    if (!car) {
      throw new NotFoundException();
    }
    return car;
  }

  async findBrand(brand: string) {
    const car = this.DB.find((car: ICar) => car.brand === brand);
    if (!car) {
      throw new NotFoundException();
    }
    const carId = car.carId;
    const orders = await this.entity.find();
    const cars = orders.filter((order) => {
      order.carId = carId;
    });
    return cars;
  }
  async checkDate(id: number, start: any, end: any) {
    start = new Date(start);
    end = new Date(end);
    const weekDay = new Date(start).getDay();
    if (weekDay === 0 || weekDay === 6) {
      throw new BadRequestException(400, 'Weekend day not RENT');
    }
    const res = await this.entity.find({
      carId: id,
      endDate: {
        $gt: new Date(start - 259200000),
      },
      startDate: {
        $lt: new Date(end + 259200000),
      },
    });
    if (res.length !== 0) {
      throw new BadRequestException(400, 'Cant RENT');
    }
  }
  async findOne(id: string) {
    const exist = await this.entity.findById(id);
    if (!exist) {
      throw new NotFoundException();
    }
    return exist;
  }
  async daysCount(start, end) {
    const res = end - start;
    const days = res / 1000 / 60 / 60 / 24;
    return days;
  }
  async create(dto: CreateOrderDto) {
    const { name, phone, carId } = dto;
    let { startDate, endDate } = dto;
    startDate = new Date(startDate);
    endDate = new Date(endDate);

    const exist = this.DB.find((car) => car.carId == carId);
    if (!exist) {
      throw new ConflictException();
    }
    await this.checkDate(carId, startDate, endDate);

    const car = this.DB.find((car) => car.carId == carId);

    dto.name = name;
    dto.phone = phone;
    dto.startDate = startDate;
    dto.endDate = new Date(endDate);
    dto.carId = carId;
    dto.totalPrice = car.price * await this.daysCount(startDate, endDate);
    dto.brand = car.brand;
    // const car = this.DB.find((car: ICar) => car.id === dto.id);
    // dto.brand = car.brand;
    // console.log(car);
    return this.entity.create(dto);
  }
  async update(id: string, dto: UpdateOrderDto) {
    
    let { carId, startDate, endDate } = dto;
   
    const updateDto = await this.entity.findById(id);
  
    if (startDate | endDate | carId){
      const car = this.DB.find((car) => car.carId == carId);
      startDate = new Date(startDate);
      endDate = new Date(endDate);
      await this.checkDate(carId, startDate, endDate);
      updateDto.carId=car.carId;
      updateDto.brand = car.brand;
      updateDto.totalPrice = car.price * await this.daysCount(startDate, endDate);
    }
    Object.assign(updateDto, dto);
    return await updateDto.save();
  } //вставить условие if(передается startDate,endDate)то делать проверку
  async delete(id: string) {
    await this.findOne(id);
    await this.entity.findByIdAndDelete(id);
  }
  async deleteAll() {
    await this.entity.deleteMany();
  }
}

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
import { IOrder } from './interface';
import { ICar } from './interface/car.interface';

@Injectable()
export class OrderService {
  private DB: ICar[];
  constructor(
    @InjectModel(OrderEntity.name)
    private readonly entity: Model<OrderEntity>,
  ) {
    this.DB = [
      {
        id: 1,
        brand: 'BMW 530',
      },
      {
        id: 2,
        brand: 'Toyota Camry',
      },
      {
        id: 3,
        brand: 'Ford Focus',
      },
    ];
  }
  async findAll() {
    // TODO: DONE!
    return await this.entity.find();
  }

  async findCarId(id: number): Promise<ICar> {
    // TODO:
    const car = this.DB.find((car: ICar) => car.id === id);
    if (!car) {
      throw new NotFoundException();
    }
    return car;
  }
  async checkDate(id: number, start: Date | any) {
    start = new Date(start);
    const weekDay = new Date(start).getDay();
    if (weekDay === 0 || weekDay === 6) {
      throw new BadRequestException(400, 'Weekend day not RENT');
    }
    const allOrders = await this.entity.find({
      id: id,
      endDate: {
        $gt: new Date(start - 259200000),
      },
    });
    // const allIdCars = allOrders.filter((order) => order.id === id);
    // allIdCars.forEach((order) => {
    //   if (new Date(start) - new Date(order.endDate) < 259200000) {
    //     throw new ConflictException();
    //   }
    // });
  }
  async findOne(id: string) {
    const exist = await this.entity.findById(id);
    if (!exist) {
      throw new NotFoundException();
    }
    return exist;
  }
  async create(dto: CreateOrderDto) {
    const { name, phone, startDate, endDate, id } = dto;
    await this.checkDate(id, startDate);
    // const car = await this.findCarId(id);
    // this.checkDate(id, startDate, endDate)
    // const isAvailable = await this.entity.findBrand(brand);

    // if (!isAvailable) {
    //   throw new ConflictException();
    // }
    // const freeCars = isAvailable.filter((el) => el.isAvailable === true);
    // cars[0].isAvailable = false;
    const exist = await this.entity.findOne({ id });
    // console.log(exist);
    if (exist) {
      throw new ConflictException();
    }

    dto.name = name;
    dto.phone = phone;
    dto.startDate = startDate;
    dto.endDate = endDate;
    dto.id = id;
    return this.entity.create(dto);
  }
  async update(id: string, dto: UpdateOrderDto) {
    const upd = await this.entity.findById(id);
    Object.assign(upd, dto);
    return await upd.save();
  }
  async delete(id: string) {
    await this.findOne(id);
    await this.entity.findByIdAndDelete(id);
  }
}

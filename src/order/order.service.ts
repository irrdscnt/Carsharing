import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { OrderEntity } from './entity';
import {Model} from 'mongoose'
import { CreateOrderDto, UpdateOrderDto } from './dto';

@Injectable()
export class OrderService {
    constructor(
        @InjectModel(OrderEntity.name)
        private readonly entity:Model<OrderEntity>
    ){}
    async findAll() {
        return await this.entity.find()
      }

    async findOne(id:string ){
        const task=await this.entity.findById(id)
        if (!task){
            throw new NotFoundException()
        }
        return task
    }
    async findBrand(brand:string) {
        const brandd= await this.entity.find({brand})
        return brandd
    }
    async create(dto:CreateOrderDto){
        const {name,phone,startDate,endDate,brand}=dto
        /* const exist =await this.entity.findOne({name,phone,startDate,endDate,brand})
        console.log(exist)
        if (exist){
        throw new ConflictException()
    } */
        dto.name=name
        dto.phone=phone
        dto.startDate=startDate
        dto.endDate=endDate
        dto.brand=brand
        return this.entity.create(dto)
    }
    async update(id:string,dto:UpdateOrderDto){
        const upd=await this.entity.findById(id)
        Object.assign(upd,dto)
          return await upd.save()
      }
      async delete(id:string){
        await this.findOne(id)
        await this.entity.findByIdAndDelete(id)
      }
}

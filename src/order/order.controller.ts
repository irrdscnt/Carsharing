import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiConflictResponse, ApiCreatedResponse } from '@nestjs/swagger';
import { CreateOrderDto, FindOneOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
    constructor (private readonly service:OrderService){}
    @Post()
    @ApiCreatedResponse({type:CreateOrderDto})
    @ApiConflictResponse({description:'Url already exist'})
    async create(@Body() dto:CreateOrderDto){
     return await this.service.create(dto)
    }
    @Get()
    async findAll(){
        return await this.service.findAll()
    }
    @Get(':id')
    async findOne(@Param() params:FindOneOrderDto) {
        const {id}=params
       return await this.service.findOne(id)
    }
}

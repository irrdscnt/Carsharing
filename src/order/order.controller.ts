import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
} from '@nestjs/common';
import {
  ApiConflictResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
} from '@nestjs/swagger';
import { CreateOrderDto, FindOneOrderDto, UpdateOrderDto } from './dto';
import { OrderService } from './order.service';

@Controller('order')
export class OrderController {
  constructor(private readonly service: OrderService) {}
  @Post()
  @ApiCreatedResponse({ type: CreateOrderDto })
  @ApiConflictResponse({ description: 'Url already exist' })
  async create(@Body() dto: CreateOrderDto) {
    return await this.service.create(dto);
  }
  @Get()
  async findAll() {
    return await this.service.findAll();
  }
  @Get(':brand')
  async findBrand(@Param('brand') brand: string) {
    return await this.service.findBrand(brand);
  }
  @Get(':id')
  async findOne(@Param() params: FindOneOrderDto) {
    const { id } = params;
    return await this.service.findOne(id);
  }
  @Put(':id')
  @ApiCreatedResponse({ type: UpdateOrderDto })
  @ApiNotFoundResponse()
  async update(@Param() { id }: FindOneOrderDto, @Body() dto: UpdateOrderDto) {
    return await this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiNotFoundResponse({ description: ' already deleted' })
  async delete(@Param() { id }: FindOneOrderDto) {
    return await this.service.delete(id);
  }
}

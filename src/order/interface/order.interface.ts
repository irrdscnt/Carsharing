import { SchemaFactory } from '@nestjs/mongoose';
import { OrderEntity } from '../entity';

export interface IOrder {
  name: string;
  phone: string;
  startDate: string;
  endDate: string;
  brand: string;
  totalPrice: number;
}

export const OrderSchema = SchemaFactory.createForClass(OrderEntity);

import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IOrder } from '../interface/';

@Schema()
export class OrderEntity implements IOrder {
  @Prop({
    type: String,
    required: true,
  })
  name: string;
  @Prop({
    type: String,
    required: true,
  })
  phone: string;
  @Prop({
    type: Date,
    required: true,
  })
  startDate: Date;
  @Prop({
    type: Date,
    required: true,
  })
  endDate: Date;
  @Prop({
    type: Number,
    required: true,
  })
  id: number;

  // @Prop({
  //   type: String,
  //   required: true,
  // })
  // brand: string;
  @Prop({
    type: Number,
    required: true,
  })
  totalPrice: number;
}
export const OrderSchema = SchemaFactory.createForClass(OrderEntity);

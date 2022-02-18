import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IOrder } from "../interface/";

@Schema()
export class OrderEntity implements IOrder{
    @Prop({
        type:String,
        required:true,
    })
    name:string;
    @Prop({
        type:String,
        required:true,
    })
    phone:string;
    @Prop({
        type:String,
        required:true,
    })
    startDate:string;
    @Prop({
        type:String,
        required:true,
    })
    endDate:string;
    @Prop({
        type:String,
        required:true,
    })
    brand:string;
    @Prop({
        type:Number,
        required:true,
    })
    totalPrice: number;


}

export const OrderSchema=SchemaFactory.createForClass(OrderEntity);
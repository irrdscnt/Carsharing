import { Module } from '@nestjs/common';
import { OrderModule } from './order/order.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb+srv://admin:admin@cluster0.ma22l.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
    ),
    OrderModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

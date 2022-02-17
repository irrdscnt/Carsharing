import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateOrderDto {
  @ApiProperty({
    description: 'Client name',
    example: 'John',
  })
  @IsNotEmpty()
  @Length(3, 20)
  name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+996500123456',
  })
  @IsNotEmpty()
  @Length(6, 15)
  phone: string;

  @ApiProperty({
    description: 'Rent date',
    example: '28.12.2021',
  })
  @IsNotEmpty()
  startDate: string;

  @ApiProperty({
    description: 'Return date',
    example: '29.12.2021',
  })
  @IsNotEmpty()
  endDate: string;

  @ApiProperty({
    description: 'Car brand name',
    example: 'BMW',
  })
  @IsNotEmpty()
  @Length(2, 20)
  brand: string;

  // @ApiProperty({
  // 	description: 'Price for all rent days',
  // 	example: '300',
  // })
  // totalPrice: number;
}

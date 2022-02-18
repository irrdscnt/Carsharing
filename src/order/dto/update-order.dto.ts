import { ApiProperty } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiProperty({
    description: 'Client name',
    example: 'John',
  })
  name: string;

  @ApiProperty({
    description: 'Phone number',
    example: '+996500123456',
  })
  phone: string;

  @ApiProperty({
    description: 'Rent date',
    example: '28.12.2021',
  })
  startDate: string;

  @ApiProperty({
    description: 'Return date',
    example: '29.12.2021',
  })
  endDate: string;

  @ApiProperty({
    description: 'Car brand name',
    example: 'BMW',
  })
  brand: string;

  // @ApiProperty({
  // 	description: 'Price for all rent days',
  // 	example: '300',
  // })
  // totalPrice: number;
}

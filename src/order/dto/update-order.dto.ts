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
    example: '2022-02-22T10:30:40.000Z',
  })
  startDate: Date;

  @ApiProperty({
    description: 'Return date',
    example: '2022-02-22T10:30:40.000Z',
  })
  endDate: Date;

  @ApiProperty({
    description: 'Car id',
    example: 1,
  })
  carId: number;

  @ApiProperty({
    description: 'Brand',
    example: 'BMW',
  })
  brand: string;
  
  @ApiProperty({
    description: 'Price for all rent days',
    example: '300',
  })
  totalPrice: number;
}

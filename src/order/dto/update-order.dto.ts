import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateOrderDto {
  @ApiPropertyOptional({
    description: 'Client name',
    example: 'John',
  })
  name: string;

  @ApiPropertyOptional({
    description: 'Phone number',
    example: '+996500123456',
  })
  phone: string;

  @ApiPropertyOptional({
    description: 'Rent date',
    example: '2022-02-22T10:30:40.000Z',
  })
  startDate?: Date;

  @ApiPropertyOptional({
    description: 'Return date',
    example: '2022-02-22T10:30:40.000Z',
  })
  endDate?: Date;

  @ApiPropertyOptional({
    description: 'Car id',
    example: 1,
  })
  carId?: number;

  @ApiPropertyOptional({
    description: 'Brand',
    example: 'BMW',
  })
  brand: string;

  @ApiPropertyOptional({
    description: 'Price for all rent days',
    example: '300',
  })
  totalPrice: number;
}
